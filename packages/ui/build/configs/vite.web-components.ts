import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { appendComponentCss } from '../plugins/append-component-css'
import { fixImportHell } from '../plugins/fix-import-hell'
import { webComponentsNestedStyles } from '../plugins/web-components-nested-styles'
import { readFileSync } from 'fs'

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
    }),
    chunkSplitPlugin({ strategy: 'unbundle' }),
    appendComponentCss(),
    fixImportHell(),
    webComponentsNestedStyles(),
  ],
})
