import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript'
import typescript from 'typescript'
import typescriptDeclarationPlugin from 'rollup-plugin-generate-declarations'
import vuePlugin from 'rollup-plugin-vue'
import commonjsPlugin from '@rollup/plugin-commonjs'
import postcssPlugin from 'rollup-plugin-postcss'
import { terser as terserPlugin } from 'rollup-plugin-terser'
import scssPlugin from 'rollup-plugin-scss'
import { exec } from 'child_process'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { resolve } from 'path'
import sass from 'sass'

const BUILD_OPTIONS = {
  generateTypes: false,
  minify: false,
}

const tsDeclarationsPlugin = function (options = { outDir: 'dist' }) {
  return {
    name: 'generate-declarations',
    buildEnd: (err) => {
      if (err) {
        return
      }

      exec(`tsc --emitDeclarationOnly --outDir ${options.outDir}`)
    },
  }
}

const DEFAULT_CONFIG = defineConfig({
  // plugins: [
  //   // terserPlugin(), // Minification. Can be commented to prevent minification.
  //   typescriptPlugin({ typescript }), // TS
  //   vuePlugin({ target: 'browser', preprocessStyles: true, css: true, compileTemplate: true }), // Here we use target node for ssr and should preprocessStyles
  //   postcssPlugin(), // Transform preprocessStyles
  //   // scssPlugin(),
  // ],
})

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
function createESMConfig (inputPath, outPath = 'dist/') {
  const inputPathWithoutFilename = inputPath.split('/').slice(0, -1).join('/')

  return defineConfig({
    ...DEFAULT_CONFIG,

    input: inputPath,
    output: {
      dir: outPath,
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: inputPathWithoutFilename,
    },

    external: [
      'vue',
      '@vue/reactivity',
      '@vue/runtime-core',
      '@vue/shared',
      '@popperjs/core',
      'asva-executors',
      'cleave.js',
      'colortranslator',
      'lodash',
      'element-resize-detector',
      'detect-browser',
    ],

    plugins: [
      // BUILD_OPTIONS.minify ? terserPlugin() : () => null, // Minification. Can be commented to prevent minification.
      typescriptPlugin({ typescript }),
      tsDeclarationsPlugin({ outDir: outPath }),
      vuePlugin({ target: 'browser', preprocessStyles: true, compileTemplate: true }), // Here we use target node for ssr and should preprocessStyles
      postcssPlugin(), // Transform preprocessStyles
      commonjsPlugin(),
    ],
  })
}

function UMDBundleConfig (inputPath, outPath = 'dist/') {
  const importer = (url, _prev, done) => {
    if (url[0] !== '~') {
      return null
    }
    const info = { file: resolve(`node_modules/${url.substr(1)}`) }
    if (done) {
      done(info)
    }
    return info
  }

  return defineConfig({
    ...DEFAULT_CONFIG,

    input: inputPath,
    output: {
      dir: outPath,
      format: 'umd',
      name: 'vuestic-ui',
      globals: ['vue'],
    },

    plugins: [
      typescriptPlugin({ typescript }),
      // tsDeclarationsPlugin({ outDir: outPath }),
      vuePlugin({ target: 'browser', compileTemplate: true, css: false, preprocessStyles: true }), // Here we use target node for ssr and should preprocessStyles
      commonjsPlugin(),
      nodeResolve(),
      postcssPlugin({ extract: 'main.css' }),
    ],
  })
}

export default [
  // createESMConfig('./src/main.ts', 'dist/esm'),
  UMDBundleConfig('./src/main.ts', 'dist/umd'),
]
