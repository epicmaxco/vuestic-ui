const utils = require('./utils')
const uglify = require('uglify-es')
const rollup = require('rollup')
const path = require('path')
const buble = require('@rollup/plugin-buble')
const json = require('@rollup/plugin-json')
const nodeResolve = require('@rollup/plugin-node-resolve').default
const vue = require('rollup-plugin-vue')
const typescript = require('@rollup/plugin-typescript')

import type { InputOptions, OutputOptions } from 'rollup'

process.env.BABEL_ENV = 'production'

// Setup for when we don't need babel.
const rollupPluginsModern = [
  nodeResolve(),
  json(),
  vue(),
  typescript(),
]

// Setup for when we do need babel.
const rollupPluginsLegacy = [
  ...rollupPluginsModern,
  buble({
    objectAssign: 'Object.assign',
  }),
]

// There could be a number of configs for specific cases, i.e. icons, css etc.
type BuildConfig = {
  rollup: {
    input: InputOptions,
    output: OutputOptions
  },
  build: { minified?: boolean, minExt?: boolean, modern?: boolean, unminified?: boolean },
}

const builds: BuildConfig[] = [
  {
    rollup: {
      input: {
        input: path.resolve(__dirname, './main.ts'),
      },
      output: {
        file: path.resolve(__dirname, './../../dist/main.esm.js'),
        format: 'es',
      },
    },
    build: {
      minified: true,
      minExt: false,
      modern: true,
      unminified: false,
    },
  },
]

function build (builds: BuildConfig[]) {
  return Promise
    .all(builds.map(genConfig).map(buildEntry))
    .catch(utils.logError)
}

function genConfig (config: BuildConfig) {
  config.rollup.input.plugins = config.build.modern === true
    ? rollupPluginsModern
    : rollupPluginsLegacy

  config.rollup.input.external = config.rollup.input.external as string[] || []
  config.rollup.input.external.push('vue')

  config.rollup.output.banner =
    `/*!\n` +
    ` * VuesticUI v' + ${require('./../../package.json').version}\n` +
    ` * Released under the MIT License.\n` +
    ` */\n`
  config.rollup.output.name = config.rollup.output.name || 'VuesticUI'

  config.rollup.output.globals = config.rollup.output.globals || {}
  // @ts-ignore
  config.rollup.output.globals.vue = 'Vue'

  return config
}

/**
 * Add extension to filename
 * @param filename
 * @param ext
 */
function addExtension (filename: string, ext = 'min') {
  const insertionPoint = filename.lastIndexOf('.')
  return `${filename.slice(0, insertionPoint)}.${ext}${filename.slice(insertionPoint)}`
}

/**
 * Complain when global version of Vue is not available for UMD.
 * @param code
 */
function injectVueRequirement (code: string) {
  const index = code.indexOf(`Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue`)

  if (index === -1) {
    return code
  }

  const checkMe = ` if (Vue === void 0) {
    console.error('[ VuesticUI ] Vue is required to run. Please add a script tag for it before loading Vuestic.')
    return
  }
  `

  return code.substring(0, index - 1) +
    checkMe +
    code.substring(index)
}

function buildEntry (config: BuildConfig) {
  const destination = config.rollup.output.file as string
  return rollup
    .rollup(config.rollup.input)
    // @ts-ignore
    .then(bundle => bundle.generate(config.rollup.output))
    // @ts-ignore
    .then(({ output }) => {
      const code = config.rollup.output.format === 'umd'
        ? injectVueRequirement(output[0].code)
        : output[0].code

      // TODO Not super sure what unminified does or whether we need it even.
      return config.build.unminified
        ? utils.writeFile(destination, code)
        : code
    })
    // @ts-ignore
    .then(code => {
      if (!config.build.minified) {
        return code
      }

      const minified = uglify.minify(code, {
        compress: {
          ecma: config.build.modern ? 6 : 5,
        },
      })

      if (minified.error) {
        return Promise.reject(minified.error)
      }

      return utils.writeFile(
        config.build.minExt !== false
          ? addExtension(destination)
          : destination,
        utils.getBanner(destination) + minified.code,
        true,
      )
    })
    // @ts-ignore
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

build(builds)
