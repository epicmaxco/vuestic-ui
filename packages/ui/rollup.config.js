import { createCJSConfig, createESMConfig, createIIFEConfig } from './build/rollup/configs/index'

const defaultBuildParams = { input: './src/main.ts', minify: true, sourcemap: true }

export default [
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm', declaration: false }),
  createESMConfig({ ...defaultBuildParams, outDir: 'dist/esm-ssr', ssr: true, declaration: false }),
  createIIFEConfig({ ...defaultBuildParams, outDir: 'dist/iife' }),
  createCJSConfig({ ...defaultBuildParams, outDir: 'dist/cjs' }),
]
