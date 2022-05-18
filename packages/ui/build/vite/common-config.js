import { resolve as resolver } from 'path'
import { readFileSync } from 'fs'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import vue from '@vitejs/plugin-vue'

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')))
const dependencies = Object.keys(packageJSON.dependencies)
const peerDependencies = Object.keys(packageJSON.peerDependencies)

export const resolve = {
  alias: {
    '@': resolver(process.cwd(), 'src'),
    '~/': resolver(process.cwd(), 'src'),
    '~normalize.css/normalize.css': 'normalize.css/normalize.css',
  },
}

export default function getViteConfig (isProduction, format) {
  const isEsm = format === 'esm'

  const config = {
    resolve,

    build: {
      outDir: `dist/${format}`,

      cssCodeSplit: isEsm,

      lib: {
        entry: resolver(process.cwd(), 'src/main.ts'),
        fileName: () => `main.${isEsm ? 'mjs' : 'js'}`,
        formats: [format],

        // only for iife/umd
        name: 'vuestic',
      },

      sourcemap: true,

      // may be in future - less transpiling, faster (default 'modules')
      // if the build.minify option is 'terser', 'esnext' will be forced down to 'es2019'
      // target: 'esnext',

      // default esbuild, not available for esm format in lib mode
      minify: 'terser',

      terserOptions: {
        // https://stackoverflow.com/questions/57720816/rails-webpacker-terser-keep-fnames

        // disable mangling class names (for vue class component)
        keep_classnames: true,

        // disable mangling functions names
        keep_fnames: true,
      },

      rollupOptions: {
        external: [...dependencies, ...peerDependencies],
      },
    },

    plugins: [
      vue({
        isProduction,
        exclude: [/\.md$/, /\.spec\.ts$/, /\.spec\.disabled$/],
      }),
    ],
  }

  // https://github.com/sanyuan0704/vite-plugin-chunk-split
  isEsm && config.plugins.push(chunkSplitPlugin({ strategy: 'unbundle' }))

  return config
}
