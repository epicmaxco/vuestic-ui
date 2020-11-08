import type { OutputOptions, InputOption, RollupOptions } from 'rollup'

const visualizer = require('rollup-plugin-visualizer')
const utils = require('./utils')
const { terser } = require('rollup-plugin-terser')
const rollup = require('rollup')
const path = require('path')
const buble = require('@rollup/plugin-buble')
const json = require('@rollup/plugin-json')
const nodeResolve = require('@rollup/plugin-node-resolve').default
const vue = require('rollup-plugin-vue')
const typescript = require('@rollup/plugin-typescript')
const scss = require('rollup-plugin-scss')
const commonjs = require('@rollup/plugin-commonjs')

process.env.BABEL_ENV = 'production'

// Setup for when we don't need babel.
const rollupPluginsModern = [
  // terser(),
  nodeResolve(),
  json(),
  typescript({
    include: [
      'src/**/*.ts',
      // new RegExp("shared\\/(.)+\\/(.+\.ts)")
    ],
    // typescript: require('typescript'),
  }),
  scss(),
  vue(),
  visualizer(),
  // commonjs({
  //   // We have to declare imports for rollup to catch up.
  //   // Not ideal, so remove if rollup gets better or you have good solution.
  //   namedExports: {
  //     'node_modules/lodash/index.js': [
  //       'isObject',
  //     ],
  //   },
  // }),
]

// Setup for when we do need babel.
const rollupPluginsLegacy = [
  ...rollupPluginsModern,
  buble({
    exclude: 'node_modules/**',
    objectAssign: 'Object.assign',
  }),
]

// There could be a number of configs for specific cases, i.e. icons, css etc.
type LocalBuildConfig = {
  rollup: {
    input: InputOption;
    output: OutputOptions;
  };
  flags: { minified?: boolean; minExt?: boolean; modern?: boolean; unminified?: boolean };
}

const builds: LocalBuildConfig[] = [
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
    flags: {
      minified: true,
      minExt: false,
      modern: true,
      unminified: false,

    },
  },
  {
    rollup: {
      input: {
        input: path.resolve(__dirname, './main.ts'),
      },
      output: {
        file: path.resolve(__dirname, './../../dist/main.esm.js'),
        format: 'cjs',
      },
    },
    flags: {
      minified: true,
      minExt: false,
      modern: true,
      unminified: false,
    },
  },
]

const getVersionBanner = () => {
  return ' /*!\n' +
    ` * VuesticUI v' + ${require('./../../package.json').version}\n` +
    ' * Released under the MIT License.\n' +
    ' */\n'
}

const genConfig = (config: LocalBuildConfig): RollupOptions => {
  return {
    input: config.rollup.input,
    output: {
      ...config.rollup.output,
      name: 'VuesticUI',
      banner: getVersionBanner(),
      globals: { vue: 'Vue' },
    },
    plugins: config.flags.modern === true ? rollupPluginsModern : rollupPluginsLegacy,
    external: ['vue'],
  }
}

/**
 * Add extension to filename
 * @param filename
 * @param ext
 */
const addExtension = (filename: string, ext = 'min') => {
  const insertionPoint = filename.lastIndexOf('.')
  return `${filename.slice(0, insertionPoint)}.${ext}${filename.slice(insertionPoint)}`
}

/**
 * Complain when global version of Vue is not available for UMD.
 * @param code
 */
const injectVueRequirement = (code: string) => {
  const index = code.indexOf('Vue = Vue && Vue.hasOwnProperty(\'default\') ? Vue[\'default\'] : Vue')

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

const buildEntry = async (config: RollupOptions, buildFlags: LocalBuildConfig['flags']) => {
  const output = config.output as OutputOptions
  const destination = output.file as string
  const build = await rollup.rollup(config.input)
  const outputChunk = await build.generate(config.output)
  const code = outputChunk.format === 'umd'
    ? injectVueRequirement(outputChunk[0].code)
    : outputChunk[0].code

  // TODO Not super sure what unminified does or whether we need it even.
  buildFlags.unminified && await utils.writeFile(destination, code)

  await utils.writeFile(
    buildFlags.minExt !== false
      ? addExtension(destination)
      : destination,
    utils.getBanner(destination) + code,
    true,
  )

  // .catch(err => {
  //   console.error(err)
  //   process.exit(1)
  // })
}

const build = (builds: LocalBuildConfig[]) => {
  return Promise
    .all(builds.map((build) => {
      const rollupOptions = genConfig(build)
      return buildEntry(rollupOptions, build.flags)
    }))
    .catch(utils.logError)
}

build(builds)
