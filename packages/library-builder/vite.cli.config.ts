import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: './src/cli/index.ts',
      formats: ['es'],
      name: 'library-builder',
    },
    outDir: 'dist/cli',
    ssr: true
  },
})
