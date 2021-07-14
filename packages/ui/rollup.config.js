import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript'
import typescript from 'typescript'
import typescriptDeclarationPlugin from 'rollup-plugin-generate-declarations'
import vuePlugin from 'rollup-plugin-vue'
import commonjsPlugin from '@rollup/plugin-commonjs'
import postcssPlugin from 'rollup-plugin-postcss'
import { terser as terserPlugin } from 'rollup-plugin-terser'
import scssPlugin from 'rollup-plugin-scss'

const DEFAULT_CONFIG = {
  plugins: [
    // terserPlugin(), // Minification. Can be commented to prevent minification.
    typescriptPlugin({ typescript }), // TS
    typescriptDeclarationPlugin(),
    vuePlugin({ target: 'browser', preprocessStyles: true }), // Here we use target node for ssr and should preprocessStyles
    postcssPlugin(), // Transform preprocessStyles
    // scssPlugin(),
    commonjsPlugin(), // Used to transform commonjs to esm.
  ],
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
}

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
  })
}

function UMDBundleConfig (inputPath, outPath = 'dist/') {
  return defineConfig({
    ...DEFAULT_CONFIG,
    input: inputPath,
    output: {
      format: 'umd',
      dir: outPath,
      name: 'vuestic-ui',
      // file: `${outPath}vuestic-ui.js`,
    },
  })
}

export default [
  createESMConfig('./src/main.ts'),
  // UMDBundleConfig('./src/vuestic-components.ts'),
]
