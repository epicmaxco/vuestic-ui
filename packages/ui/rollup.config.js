import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcssPlugin from 'rollup-plugin-postcss'
import { terser as terserPlugin } from 'rollup-plugin-terser'
import nodeBuiltinsPlugin from 'rollup-plugin-node-builtins'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from './build/rollup/rollup-typescript-declaration'

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
function createESMConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = false }) {
  const inputPathWithoutFilename = input.split('/').slice(0, -1).join('/')

  const config = defineConfig({
    input,
    output: {
      dir: outDir,
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
      typescriptPlugin({ check: false }),
      vuePlugin({ target: ssr ? 'node' : 'browser', template: { optimizeSSR: ssr }, compileTemplate: true, preprocessStyles: true }),
      commonjsPlugin(),
      postcssPlugin({ minimize: minify }), // Transform preprocessStyles
    ],
  })

  if (minify) { config.plugins.push(terserPlugin()) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }

  return config
}

/** Used to create a universe lib, that can be imported from cdn by browser */
function createUMDConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = false }) {
  const config = defineConfig({
    input,
    output: {
      dir: outDir,
      format: 'umd',

      /**
       * Then user can use vuestic global VuesticUI
       * example: VuesticUI.VuesticPlugin
       */
      name: 'VuesticUI',
      globals: { vue: 'Vue' },

      // Define process object for libs.
      intro: "var process = { env: { NODE_ENV: 'production' } };",
    },

    external: ['vue'],

    plugins: [
      typescriptPlugin({ check: false }),
      vuePlugin({ target: ssr ? 'node' : 'browser', template: { optimizeSSR: ssr }, compileTemplate: true, preprocessStyles: true }),
      commonjsPlugin(),
      nodeResolve({ browser: !ssr }),
      postcssPlugin({ extract: 'main.css' }),
    ],
  })

  if (minify) { config.plugins.push(terserPlugin({ safari10: true, compress: { ecma: 2015, pure_getters: true } })) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }
  if (!ssr) { config.plugins.push(nodeBuiltinsPlugin({ crypto: true })) }

  return config
}

export default [
  createESMConfig({ input: './src/main.ts', outDir: 'dist/esm', minify: true }),
  createUMDConfig({ input: './src/main.ts', outDir: 'dist/umd', minify: true }),
  createUMDConfig({ input: './src/main.ts', outDir: 'dist/ssr/umd', minify: true, ssr: true }),
  createESMConfig({ input: './src/main.ts', outDir: 'dist/ssr/esm', minify: true, ssr: true }),
]
