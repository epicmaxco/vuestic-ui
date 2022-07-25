import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from '../common-config'

/** Separated build for essential.css styles  */
export default defineConfig({
  resolve,

  build: {
    outDir: 'dist/styles',

    assetsDir: './',

    rollupOptions: {
      input: ['src/styles/essential.scss'],

      output: {
        assetFileNames: '[name].[ext]',
      },
    },
  },

  plugins: [
    vue(),
  ],
})
