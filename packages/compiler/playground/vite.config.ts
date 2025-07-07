
import { fileURLToPath, URL } from 'node:url'
import Inspect from 'vite-plugin-inspect'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { vuestic } from '../vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vuestic({
      devtools: {
        include: fileURLToPath(new URL('./src', import.meta.url)) + '/**/*.vue'
      },
      autoImport: true,
      config: true,
    }),
    vue(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vuestic/compiler/devtools': fileURLToPath(new URL('../devtools/client/index.ts', import.meta.url)),
    }
  },
  build: {
    minify: false,
  }
})
