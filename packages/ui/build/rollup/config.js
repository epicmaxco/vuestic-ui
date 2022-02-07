import { createCJSConfig, createESMConfig, createIIFEConfig, createStylesConfig } from './configs/index'
import fs from 'fs'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

if (fs.existsSync('./dist')) {
  // Remove ./dist folder before build.
  fs.rmdirSync('./dist', { recursive: true })
}

export const RollupConfig = [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm', minify: true }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true, minify: true }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife', minify: true }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs', minify: true }),
  createStylesConfig({ ...defaultBuildParams, outDir: 'dist', minify: true, input: './src/styles/vuestic-styles.scss' }),
]
