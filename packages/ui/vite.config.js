import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { getInputs } from './build/rollup/generate-rollup-inputs'

export default defineConfig({
  build: {
    outDir: 'dist/esm',

    assetsDir: 'css',

    cssCodeSplit: true,

    sourcemap: true,

    minify: true,

    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'VuesticUI',
      fileName: 'main',
      formats: ['es', 'cjs'],
    },

    // rollupOptions: {
    //   treeshake: 'safest',
    //
    //   input: getInputs(),
    //
    //   output: {
    //     dir: './dist/esm',
    //     format: 'esm',
    //     entryFileNames: '[name].mjs',
    //     chunkFileNames: '[name].mjs',
    //   },
    // },
  },

  // css: {
  //   postcss: {
  //     plugins: [],
  //   },
  // },

  plugins: [vue({
    isProduction: true,
  })],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~normalize.css/normalize.css': 'normalize.css/normalize.css',
    },
  },
})
