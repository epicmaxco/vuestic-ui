import { readFileSync, lstatSync, readdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { appendComponentCss } from './plugins/append-component-css'

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')))
const dependencies = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)]
const external = { external: dependencies }

export const readDirRecursive = (path) => {
  return readdirSync(path)
    .reduce((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}

export const resolve = {
  alias: {
    '@': resolver(process.cwd(), 'src'),
    '~/': resolver(process.cwd(), 'src'),
  },
}

const rollupMjsBuildOptions = {
  input: resolver(process.cwd(), 'src/main.ts'),

  output: {
    sourcemap: true,
    dir: 'dist/esm-node',
    format: 'esm',
    entryFileNames: '[name].mjs',
    chunkFileNames: '[name].mjs',
    assetFileNames: '[name].[ext]',
  },
}

const libBuildOptions = (format) => ({
  lib: {
    entry: resolver(process.cwd(), 'src/main.ts'),
    fileName: () => 'main.js',
    formats: [format],

    // only for iife/umd
    name: 'vuestic',
  },
})

export default function createViteConfig (format) {
  const isEsm = ['esm', 'esm-node'].includes(format)
  const isMjs = format === 'esm-node'

  const config = {
    resolve,

    build: {
      outDir: `dist/${format}`,

      cssCodeSplit: isEsm,

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
    },

    plugins: [
      vue({
        isProduction: true,
        exclude: [/\.md$/, /\.spec\.ts$/, /\.spec\.disabled$/],
      }),
    ],
  }

  // https://github.com/sanyuan0704/vite-plugin-chunk-split
  isEsm && config.plugins.push(chunkSplitPlugin({ strategy: 'unbundle' }))
  isEsm && config.plugins.push(appendComponentCss())

  if (!isMjs) { config.build = { ...config.build, ...libBuildOptions(format) } }

  config.build.rollupOptions = isMjs ? { ...external, ...rollupMjsBuildOptions } : external

  return config
}
