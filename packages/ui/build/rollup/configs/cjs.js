import { defineConfig } from 'rollup'
import typescriptPlugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcssPlugin from 'rollup-plugin-postcss'
import nodeBuiltinsPlugin from 'rollup-plugin-node-builtins'
import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import typescriptDeclarationPlugin from '../plugins/rollup-typescript-declaration'
import { terserPlugin } from '../plugins/rollup-teaser-preset'
import { dependencies, peerDependencies } from '../utils'

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
      typescriptPlugin({ check: false }),
      vuePlugin({ target: ssr ? 'node' : 'browser', template: { optimizeSSR: ssr }, compileTemplate: true, preprocessStyles: true }),
      commonjsPlugin(),
      nodeResolvePlugin({ browser: !ssr }),
      postcssPlugin(),
    ],
  })

  if (minify) { config.plugins.push(terserPlugin({ compress: { ecma: 2015, pure_getters: true } })) }
  if (declaration) { config.plugins.push(typescriptDeclarationPlugin({ outDir })) }
  if (!ssr) { config.plugins.push(nodeBuiltinsPlugin({ crypto: true })) }

  return config
}
