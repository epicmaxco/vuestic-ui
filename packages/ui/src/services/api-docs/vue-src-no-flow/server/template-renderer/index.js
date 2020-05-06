/*       */

import { isJS, isCSS } from '../util'
import TemplateStream from './template-stream'
import { parseTemplate } from './parse-template'
import { createMapper } from './create-async-file-mapper'

const path = require('path')
const serialize = require('serialize-javascript')

export default class TemplateRenderer {
  constructor (options) {
    this.options = options
    this.inject = options.inject !== false
    // if no template option is provided, the renderer is created
    // as a utility object for rendering assets like preload links and scripts.

    const { template } = options
    this.parsedTemplate = template
      ? typeof template === 'string'
        ? parseTemplate(template)
        : template
      : null

    // function used to serialize initial state JSON
    this.serialize = options.serializer || (state => {
      return serialize(state, { isJSON: true })
    })

    // extra functionality with client manifest
    if (options.clientManifest) {
      const clientManifest = this.clientManifest = options.clientManifest
      // ensure publicPath ends with /
      this.publicPath = clientManifest.publicPath === ''
        ? ''
        : clientManifest.publicPath.replace(/([^\/])$/, '$1/')
      // preload/prefetch directives
      this.preloadFiles = (clientManifest.initial || []).map(normalizeFile)
      this.prefetchFiles = (clientManifest.async || []).map(normalizeFile)
      // initial async chunk mapping
      this.mapFiles = createMapper(clientManifest)
    }
  }

  bindRenderFns (context) {
    const renderer = this
    ;['ResourceHints', 'State', 'Scripts', 'Styles'].forEach(type => {
      context[`render${type}`] = renderer[`render${type}`].bind(renderer, context)
    })
    // also expose getPreloadFiles, useful for HTTP/2 push
    context.getPreloadFiles = renderer.getPreloadFiles.bind(renderer, context)
  }

  // render synchronously given rendered app content and render context
  render (content, context) {
    const template = this.parsedTemplate
    if (!template) {
      throw new Error('render cannot be called without a template.')
    }
    context = context || {}

    if (typeof template === 'function') {
      return template(content, context)
    }

    if (this.inject) {
      return (
        template.head(context) +
        (context.head || '') +
        this.renderResourceHints(context) +
        this.renderStyles(context) +
        template.neck(context) +
        content +
        this.renderState(context) +
        this.renderScripts(context) +
        template.tail(context)
      )
    } else {
      return (
        template.head(context) +
        template.neck(context) +
        content +
        template.tail(context)
      )
    }
  }

  renderStyles (context) {
    const initial = this.preloadFiles || []
    const async = this.getUsedAsyncFiles(context) || []
    const cssFiles = initial.concat(async).filter(({ file }) => isCSS(file))
    return (
      // render links for css files
      (cssFiles.length
        ? cssFiles.map(({ file }) => `<link rel="stylesheet" href="${this.publicPath}${file}">`)
          .join('')
        : '') +
      // context.styles is a getter exposed by vue-style-loader which contains
      // the inline component styles collected during SSR
      (context.styles || '')
    )
  }

  renderResourceHints (context) {
    return this.renderPreloadLinks(context) + this.renderPrefetchLinks(context)
  }

  getPreloadFiles (context) {
    const usedAsyncFiles = this.getUsedAsyncFiles(context)
    if (this.preloadFiles || usedAsyncFiles) {
      return (this.preloadFiles || []).concat(usedAsyncFiles || [])
    } else {
      return []
    }
  }

  renderPreloadLinks (context) {
    const files = this.getPreloadFiles(context)
    const shouldPreload = this.options.shouldPreload
    if (files.length) {
      return files.map(({ file, extension, fileWithoutQuery, asType }) => {
        let extra = ''
        // by default, we only preload scripts or css
        if (!shouldPreload && asType !== 'script' && asType !== 'style') {
          return ''
        }
        // user wants to explicitly control what to preload
        if (shouldPreload && !shouldPreload(fileWithoutQuery, asType)) {
          return ''
        }
        if (asType === 'font') {
          extra = ` type="font/${extension}" crossorigin`
        }
        return `<link rel="preload" href="${
          this.publicPath}${file
        }"${
          asType !== '' ? ` as="${asType}"` : ''
        }${
          extra
        }>`
      }).join('')
    } else {
      return ''
    }
  }

  renderPrefetchLinks (context) {
    const shouldPrefetch = this.options.shouldPrefetch
    if (this.prefetchFiles) {
      const usedAsyncFiles = this.getUsedAsyncFiles(context)
      const alreadyRendered = file => {
        return usedAsyncFiles && usedAsyncFiles.some(f => f.file === file)
      }
      return this.prefetchFiles.map(({ file, fileWithoutQuery, asType }) => {
        if (shouldPrefetch && !shouldPrefetch(fileWithoutQuery, asType)) {
          return ''
        }
        if (alreadyRendered(file)) {
          return ''
        }
        return `<link rel="prefetch" href="${this.publicPath}${file}">`
      }).join('')
    } else {
      return ''
    }
  }

  renderState (context, options) {
    const {
      contextKey = 'state',
      windowKey = '__INITIAL_STATE__',
    } = options || {}
    const state = this.serialize(context[contextKey])
    const autoRemove = process.env.NODE_ENV === 'production'
      ? ';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());'
      : ''
    const nonceAttr = context.nonce ? ` nonce="${context.nonce}"` : ''
    return context[contextKey]
      ? `<script${nonceAttr}>window.${windowKey}=${state}${autoRemove}</script>`
      : ''
  }

  renderScripts (context) {
    if (this.clientManifest) {
      const initial = this.preloadFiles.filter(({ file }) => isJS(file))
      const async = (this.getUsedAsyncFiles(context) || []).filter(({ file }) => isJS(file))
      const needed = [initial[0]].concat(async, initial.slice(1))
      return needed.map(({ file }) => {
        return `<script src="${this.publicPath}${file}" defer></script>`
      }).join('')
    } else {
      return ''
    }
  }

  getUsedAsyncFiles (context) {
    if (!context._mappedFiles && context._registeredComponents && this.mapFiles) {
      const registered = Array.from(context._registeredComponents)
      context._mappedFiles = this.mapFiles(registered).map(normalizeFile)
    }
    return context._mappedFiles
  }

  // create a transform stream
  createStream (context) {
    if (!this.parsedTemplate) {
      throw new Error('createStream cannot be called without a template.')
    }
    return new TemplateStream(this, this.parsedTemplate, context || {})
  }
}

function normalizeFile (file) {
  const withoutQuery = file.replace(/\?.*/, '')
  const extension = path.extname(withoutQuery).slice(1)
  return {
    file,
    extension,
    fileWithoutQuery: withoutQuery,
    asType: getPreloadType(extension),
  }
}

function getPreloadType (ext) {
  if (ext === 'js') {
    return 'script'
  } else if (ext === 'css') {
    return 'style'
  } else if (/jpe?g|png|svg|gif|webp|ico/.test(ext)) {
    return 'image'
  } else if (/woff2?|ttf|otf|eot/.test(ext)) {
    return 'font'
  } else {
    // not exhausting all possibilities here, but above covers common cases
    return ''
  }
}
