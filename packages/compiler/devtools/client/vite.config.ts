
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {  appendStyle } from './build/append-style'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    appendStyle('vuestic-devtools.es.js')
  ],

  build: {
    minify: false,
    sourcemap: false,

    lib: {
      entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
      name: 'vuestic-devtools',
      formats: ['es'],
      fileName: (format) => `vuestic-devtools.es.js`,
    },

    rollupOptions: {
      external: ['vue', 'shiki', 'vuestic-ui'],

      output: {
        chunkFileNames: `[name].js`,
      }
    }
  },
})
