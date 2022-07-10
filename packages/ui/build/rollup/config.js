import { createCJSConfig, createESMConfig, createIIFEConfig, createStylesConfig } from './configs/index'
import fs from 'fs'
import { execSync } from 'child_process'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

if (fs.existsSync('./dist')) {
  // Remove ./dist folder before build.
  fs.rmdirSync('./dist', { recursive: true })
}

// Build types before build.
try {
  execSync('yarn build:types', { stdio: 'inherit' })
} catch (e) {
  console.error('Error when build types.')
  process.exit(1)
}

export const RollupConfig = [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm', minify: false }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-node', outExt: 'mjs' }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife' }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs' }),
  createStylesConfig({ ...defaultBuildParams, outDir: 'dist', input: ['./src/styles/vuestic-styles.scss', defaultBuildParams.input] }),
]
