import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: './dist/stats.html',
      title: 'Vuestic Test App',
      template: 'sunburst',
      sourcemap: true,
    })
  ],
  build: {
    sourcemap: true,
    outDir: 'dist/vite',
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
