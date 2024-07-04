
import { fileURLToPath, URL } from 'node:url'
import Inspect from 'vite-plugin-inspect'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { vuesticDevtools } from '../vite/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuesticDevtools({
      include: fileURLToPath(new URL('./src', import.meta.url)) + '/**/*.vue'
    }),
    vue(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
