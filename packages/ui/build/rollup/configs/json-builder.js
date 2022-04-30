import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from '../plugins/rollup-typescript-declaration'
import { terserPlugin } from '../plugins/rollup-teaser-preset'
import postcssPlugin from 'rollup-plugin-postcss'
import postcssImport from '../postcss-plugins/postcss-import'
import json from '@rollup/plugin-json'

export function createJsonBuilderConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = false, sourcemap = false }) {
  const config = defineConfig({
    input,
    output: {
      sourcemap,
      name: 'builder',
      file: `${outDir}/builder.js`,
      format: 'iife',
    },
    plugins: [
      json(),
      vuePlugin({
        target: 'browser',
        compileTemplate: false,
        preprocessStyles: true,
      }),
      commonjsPlugin(),
      typescriptPlugin({
        check: false,
      }),
      typescriptDeclarationPlugin({ outDir }),
      postcssPlugin({
        minimize: minify,
        plugins: [postcssImport()],
      }),
      nodeResolvePlugin({
        browser: false,
      }),
    ],
  })

  if (minify) {
    config.plugins.push(terserPlugin())
  }

  return config
}
