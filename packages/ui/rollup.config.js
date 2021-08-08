import { createCJSConfig, createESMConfig, createIIFEConfig } from './build/rollup/configs/index'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

export default [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm', minify: true }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true, minify: true }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife' }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs' }),
]
