import { Plugin } from 'vite'
import kebabCase from 'lodash/kebabCase'

const parseVBinds = (style: string) => {
  return style
    .match(/v-bind\((.*)\)/g)
    ?.map((line) => line.match(/v-bind\(([^)]*)\)/)![1]) ?? []
}

const getRootNodeCode = (code: string) => {
  const template = code.match(/<template[^>]*>([\s\S]*)<\/template>/)?.[1]
  const rootNode = template?.match(/<[^>]*>/)?.[0]
  return rootNode
}

const renderCssVariablesString = (vBinds: string[]) => {
  return vBinds.map((vBind, index) => {
    return `--va-${index}-${kebabCase(vBind)}: \${String(${vBind})}`
  }, '').join(';')
}

const renderObjectGuard = (styleContent: string, binds: string[]) => {
  const cssVariablesString = renderCssVariablesString(binds)
  const cssVariablesObject = binds.map((vBind, index) => {
    return `'--va-${index}-${kebabCase(vBind)}': String(${vBind})`
  }, '').join(',')
  return `typeof ${styleContent} === 'object' ? { ...${styleContent}, ${cssVariablesObject} } : ${styleContent} + \`;${cssVariablesString}\``
}

export const transformVueComponent = (code: string) => {
  const style = code.match(/<style[^>]*>([\s\S]*)<\/style>/)
  if (!style) { return }

  const vBinds = parseVBinds(style[0])
  if (!vBinds.length) { return }

  const rootNode = getRootNodeCode(code)
  if (!rootNode) { throw new Error('vuestic:v-bind-fix-plugin: Root node not found in template') }

  // Replace each v-bind() with var(--va-index-name)
  vBinds.forEach((vBind, index) => {
    try {
      code = code.replace(new RegExp(`v-bind\\(${vBind}\\)`, 'gm'), `var(--va-${index}-${kebabCase(vBind)})`)
    } catch (e) {
      console.log(vBind)
      throw e
    }
  })

  const [vBindCode, vBindContent] = rootNode?.match(/:style="([^"]*)"/) || []
  const [attrCode, attrContent] = rootNode?.match(/[^:]style="([^"]*)"/) || []
  const cssVariablesString = renderCssVariablesString(vBinds)
  const hasVBind = Boolean(vBindCode)

  // If style attr already exists simply add css variables to it
  if (vBindContent || attrContent) {
    if (hasVBind) {
      return code.replace(/:style="([^"]*)"/, `:style="${renderObjectGuard(vBindContent, vBinds)}"`)
    }

    return code.replace(/style="([^"]*)"/, `:style="\`$1;${cssVariablesString}\`"`)
  }

  if (/\/>$/.test(rootNode)) {
    const newRootNode = rootNode.replace('/>', ` :style="\`${cssVariablesString}\`"/>`)
    return code.replace(rootNode, newRootNode)
  }

  const newRootNode = rootNode.replace('>', ` :style="\`${cssVariablesString}\`">`)
  return code.replace(rootNode, newRootNode)
}

export const componentVBindFix = (): Plugin => {
  return {
    name: 'vuestic:component-v-bind-fix',
    enforce: 'pre',
    transform (code, id) {
      if (!/\.vue$/.test(id)) {
        return
      }

      return transformVueComponent(code)
    },
  }
}
