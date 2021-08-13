import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcssPlugin from 'rollup-plugin-postcss'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from '../plugins/rollup-typescript-declaration'
import { terserPlugin } from '../plugins/rollup-teaser-preset'
import { dependencies, peerDependencies } from '../utils'

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
export function createESMConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = false, sourcemap = false }) {
  const inputPathWithoutFilename = input.split('/').slice(0, -1).join('/')

  const config = defineConfig({
    input,
    output: {
      sourcemap,
      dir: outDir,
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: inputPathWithoutFilename,
    },

    external: [
      '@vue/server-renderer',
      ...dependencies,
      ...peerDependencies,
    ],

    plugins: [
      typescriptPlugin({ check: false }),
      vuePlugin({ target: ssr ? 'node' : 'browser', template: { optimizeSSR: ssr }, compileTemplate: true, preprocessStyles: true }),
      commonjsPlugin(),
      postcssPlugin({
        minimize: minify,
      }),
      nodeResolvePlugin(),
    ],
  })

  if (minify) { config.plugins.push(terserPlugin()) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }

  return config
}
