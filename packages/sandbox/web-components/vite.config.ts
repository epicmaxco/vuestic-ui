import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './web-components',
  build: {
    sourcemap: true,
    outDir: '../dist/vite-web-components',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  esbuild: {
    keepNames: true
  },
})
