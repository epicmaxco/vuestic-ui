import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/styles/index.scss'),
      output: {
        assetFileNames: 'ag-theme-vuestic.[ext]'
      },
    },
  }
})
