import { readFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')))
export const dependencies = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)]

// https://github.com/sanyuan0704/vite-plugin-chunk-split
export const chunkPlugin = chunkSplitPlugin({ strategy: 'unbundle' })

export const vuePlugin = vue({
  isProduction: true,
  exclude: [/\.md$/, /\.spec\.ts$/, /\.spec\.disabled$/],
})

export const resolve = {
  alias: {
    '@': resolver(process.cwd(), 'src'),
    '~/': resolver(process.cwd(), 'src'),
    '~normalize.css/normalize.css': 'normalize.css/normalize.css',
  },
}

export const commonOptions = {
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
        fileName: () => 'main.js',
        formats: [format],

        // only for iife/umd
        name: 'vuestic',
      },

      ...commonOptions,

      rollupOptions: {
        external: dependencies,
      },
    },

    plugins: [vuePlugin],
  }

  isEsm && config.plugins.push(chunkPlugin)

  return config
}
