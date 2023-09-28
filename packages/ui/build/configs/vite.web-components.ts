import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { removeSideEffectedChunks } from '../plugins/remove-side-effected-chunks'
import { webComponentsNestedStyles } from '../plugins/web-components-nested-styles'
import { readFileSync } from 'fs'

/**
 * Build web components folder. It is a separated build of vuestic-ui for SPA-only (?: maybe for SPA-only).
 * We use vue customElement compiler option here, so all components will be compiled optimized for web components.
 * Then user need to use defineCustomElement, where vuestic component is a first argument.
 *
 * Vue makes all custom elements to be in its own isolated Shadow Dom, so we need to inject css into this shadow dom.
 * Vue makes it automatically, but not for child components, so we have web-components-nested-styles plugin here.
 */

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')).toString())
const dependencies = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)]

export default () => defineConfig({
  build: {
    lib: {
      entry: resolver(process.cwd(), 'src/main.ts'),
      fileName: () => 'main.js',
      formats: ['es'],
    },

    sourcemap: true,

    cssCodeSplit: true,

    outDir: resolver(process.cwd(), 'dist/web-components'),

    rollupOptions: {
      external: dependencies,

      output: {
        sourcemap: true,
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },

    minify: false,
  },

  plugins: [
    vue({
      customElement: true,
      isProduction: true,
    }),
    chunkSplitPlugin({ strategy: 'unbundle' }),
    removeSideEffectedChunks(),
    webComponentsNestedStyles(),
    // TODO: Make plugin to clean up empty generated files, for example `types.js`
  ],
})
