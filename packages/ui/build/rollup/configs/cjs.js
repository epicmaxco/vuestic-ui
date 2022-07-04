import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcssPlugin from 'rollup-plugin-postcss'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from '../plugins/rollup-typescript-declaration'
import { terserPlugin } from '../plugins/rollup-terser-preset'
import { dependencies, peerDependencies } from '../utils'
import postcssImport from '../postcss-plugins/postcss-import'

/** Used for SSR builds */
export function createCJSConfig ({ input, outDir = 'dist/', minify = false, declaration = false, ssr = true, sourcemap = false }) {
  const config = defineConfig({
    input,
    output: {
      sourcemap,
      dir: outDir,
      format: 'cjs',
    },

    external: [
      '@vue/server-renderer',
      ...dependencies,
      ...peerDependencies,
    ],

    plugins: [
      vuePlugin({ template: { optimizeSSR: ssr }, preprocessStyles: true }),
      commonjsPlugin(),
      nodeResolvePlugin({ browser: !ssr }),
      postcssPlugin({
        plugins: [postcssImport()],
      }),
      typescriptPlugin({ check: false }),
    ],
  })

  if (minify) { config.plugins.push(terserPlugin({ compress: { ecma: 2015, pure_getters: true } })) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }

  return config
}
