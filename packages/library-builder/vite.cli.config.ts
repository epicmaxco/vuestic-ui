import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: './src/cli/index.ts',
      formats: ['cjs', 'es'],
      name: 'library-builder',
    },
    outDir: 'dist/cli',
    ssr: true
  },
})
