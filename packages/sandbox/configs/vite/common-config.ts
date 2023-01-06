import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import analyzer from 'rollup-plugin-analyzer'

import { appendFileSync } from 'fs'
import { resolve } from 'path'
import camelCase from 'lodash/camelCase.js'

import type { AnalysisObject } from 'rollup-plugin-analyzer'
import type { UserConfig, PluginOption } from 'vite'
type BuildType = 'base' | 'button' | 'empty' | 'button-select' | 'full'

const defineVitePlugin = <T extends UserConfig>(p: T): UserConfig & T => p

const visualizerPlugin = visualizer({
  filename: './dist/vite.stats.html',
  title: 'Vuestic Vite App',
  template: 'treemap',
  sourcemap: true,
}) as PluginOption

export default function createViteConfig (type: BuildType) {
  const onAnalysis = async (analysisObject: AnalysisObject) => {
    appendFileSync('./bundle-sizes.js', `export const ${camelCase(type)} = ${analysisObject.bundleSize}\n`)
  }
  const analyzerPlugin = analyzer({ onAnalysis, stdout: true }) as PluginOption

  const isBase = type === 'base'
  const rollupInput = `src/main${!isBase ? `-${type}` : ''}.ts`
  const outDir = `dist/vite${!isBase ? `/${type}` : ''}`

  return defineVitePlugin({
    build: {
      outDir,
      sourcemap: isBase,
      minify: 'terser',
      terserOptions: {
        keep_classnames: true,
      },
      rollupOptions: {
        input: resolve(process.cwd(), rollupInput),
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },

    plugins: [vue(), isBase ? visualizerPlugin : analyzerPlugin],
  })
}
