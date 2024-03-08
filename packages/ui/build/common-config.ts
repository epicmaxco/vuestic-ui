import { componentVBindFix } from './plugins/component-v-bind-fix'
import { readFileSync, lstatSync, readdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { appendComponentCss } from './plugins/append-component-css'
import { removeSideEffectedChunks } from './plugins/remove-side-effected-chunks'
import { fixVueGenericComponentFileNames } from './plugins/fix-vue-generic-component-file-names'
import { defineViteConfig } from './types/define-vite-config'

import type { RollupOptions } from 'rollup'

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')).toString())
const dependencies = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)]
const external = { external: dependencies }

export type BuildFormat = 'iife' | 'es' | 'cjs' | 'esm-node'

export const readDirRecursive = (path: string): string[] => {
  return readdirSync(path)
    .reduce<string[]>((acc, entry) => {
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

const rollupOutputOptions = (ext: string): RollupOptions['output'] => ({
  entryFileNames: `[name].${ext}`,
  chunkFileNames: `[name].${ext}`,
  assetFileNames: '[name].[ext]',
})

const rollupMjsBuildOptions: RollupOptions = {
  input: resolver(process.cwd(), 'src/main.ts'),

  output: {
    sourcemap: true,
    dir: 'dist/esm-node',
    format: 'esm',
    ...rollupOutputOptions('mjs'),
  },
}

const libBuildOptions = (format: 'iife' | 'es' | 'cjs') => ({
  entry: resolver(process.cwd(), 'src/main.ts'),
  fileName: () => 'main.js',
  formats: [format],

  // only for iife/umd
  name: 'vuestic',
})

export default function createViteConfig (format: BuildFormat) {
  const isEsm = ['es', 'esm-node'].includes(format)
  const isNode = format === 'esm-node'

  const config = defineViteConfig({
    resolve,

    build: {
      outDir: `dist/${format}`,

      cssCodeSplit: isEsm,

      sourcemap: true,

      // may be in future - less transpiling, faster (default 'modules')
      // if the build.minify option is 'terser', 'esnext' will be forced down to 'es2019'
      // target: 'esnext',

      // default esbuild, not available for esm format in lib mode
      minify: isEsm ? false : 'esbuild',

      lib: libBuildOptions(isNode ? 'es' : format),
    },

    plugins: [
      vue({
        isProduction: true,
        exclude: [/\.md$/, /\.spec\.ts$/, /\.spec\.disabled$/],
      }),
    ],
  })

  // https://github.com/sanyuan0704/vite-plugin-chunk-split
  isEsm && config.plugins.push(chunkSplitPlugin({ strategy: 'unbundle' }))
  isEsm && !isNode && config.plugins.push(appendComponentCss())
  isEsm && config.plugins.push(removeSideEffectedChunks())
  isEsm && config.plugins.push(fixVueGenericComponentFileNames)
  config.plugins.push(componentVBindFix())

  if (isNode) {
    config.build.rollupOptions = { ...external, ...rollupMjsBuildOptions }
  } else {
    config.build.rollupOptions = {
      ...external,
      output: rollupOutputOptions('js'),
    }
  }

  return config
}
