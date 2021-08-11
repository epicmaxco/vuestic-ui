import fs from 'fs'
import { createCJSConfig, createESMConfig, createIIFEConfig, createStylesConfig } from './build/rollup/configs/index'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

if (fs.existsSync('./dist')) {
  fs.rmdirSync('./dist', { recursive: true })
}

export default [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm', minify: true }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true, minify: true }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife', minify: true }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs', minify: true }),
  createStylesConfig({ ...defaultBuildParams, outDir: 'dist', minify: true, input: './src/styles/vuestic-styles.scss' }),
]
