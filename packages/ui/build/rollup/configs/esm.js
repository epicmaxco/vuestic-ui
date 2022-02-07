import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcssPlugin from 'rollup-plugin-postcss'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from '../plugins/rollup-typescript-declaration'
import { terserPlugin } from '../plugins/rollup-teaser-preset'
import { dependencies, peerDependencies } from '../utils'
import { getInputs } from '../generate-rollup-inputs'
import postcssImport from '../postcss-plugins/postcss-import'

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
export function createESMConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = false, sourcemap = false }) {
  const inputPathWithoutFilename = input.split('/').slice(0, -1).join('/')

  const config = defineConfig({
    // We manually specify inputs for rollup. It will automatically split bundle into chunks
    // there is why we don't need additionally provide inputs for services. Because if multiple components
    // use service it would be splitted into separate chunk.
    input: [input, ...getInputs()],
    output: {
      sourcemap,
      dir: outDir,
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
    },

    external: [
      '@vue/server-renderer',
      ...dependencies,
      ...peerDependencies,
    ],

    plugins: [
      typescriptPlugin({ check: false }),
      vuePlugin({
        target: ssr ? 'node' : 'browser',
        template: { optimizeSSR: ssr },
        compileTemplate: false,
        preprocessStyles: true,
      }),
      commonjsPlugin(),
      postcssPlugin({
        minimize: minify,
        plugins: [postcssImport()],
      }),
      nodeResolvePlugin(),
    ],
  })

  if (minify) { config.plugins.push(terserPlugin()) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }

  return config
}
