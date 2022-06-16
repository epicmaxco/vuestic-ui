import { createCJSConfig, createESMConfig, createIIFEConfig, createStylesConfig } from './configs/index'
import fs from 'fs'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

if (fs.existsSync('./dist')) {
  // Remove ./dist folder before build.
  fs.rmdirSync('./dist', { recursive: true })
}

export const RollupConfig = [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm' }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-node', outExt: 'mjs' }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife' }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs' }),
  createStylesConfig({ ...defaultBuildParams, outDir: 'dist', input: ['./src/styles/vuestic-styles.scss', defaultBuildParams.input] }),
]
