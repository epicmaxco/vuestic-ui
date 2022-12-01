import { defineConfig } from 'vite'
import { resolve } from 'path'

const pkg = require('./package.json')
const external = [...Object.keys(pkg.peerDependencies), 'fs', 'path']

export default defineConfig({
  build: {
    outDir: 'dist/',
    assetsDir: './',
    sourcemap: true,
    minify: 'terser',
    terserOptions: { keep_fnames: true },
    rollupOptions: {
      input: [resolve(process.cwd(), './sync.ts'), resolve(process.cwd(), './watch.ts')],
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
      external,
    },
  },
})
