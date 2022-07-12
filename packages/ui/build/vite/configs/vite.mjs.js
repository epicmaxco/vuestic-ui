import { defineConfig } from 'vite'
import { resolve as resolver } from 'path'
import { resolve, commonOptions, dependencies, chunkPlugin, vuePlugin } from '../common-config'

export default () => defineConfig({
  resolve,

  build: {
    assetsDir: './',

    cssCodeSplit: true,

    ...commonOptions,

    rollupOptions: {
      input: resolver(process.cwd(), 'src/main.ts'),

      output: {
        sourcemap: true,
        dir: 'dist/esm-node',
        format: 'esm',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
      },

      external: dependencies,
    },
  },

  plugins: [vuePlugin, chunkPlugin],
})
