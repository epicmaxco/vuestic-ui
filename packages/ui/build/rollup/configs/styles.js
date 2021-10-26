import { defineConfig } from 'rollup'
import postcssPlugin from 'rollup-plugin-postcss'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import deleteJunkPlugin from '../plugins/rollup-delete-junk'
import copyPlugin from 'rollup-plugin-copy'

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
export function createStylesConfig ({ input, outDir = 'dist/', minify = false }) {
  const inputPathWithoutFilename = input.split('/').slice(0, -1).join('/')

  return defineConfig({
    input,
    output: {
      dir: outDir,
    },

    plugins: [
      deleteJunkPlugin({ dirPath: outDir, deleteFilesRegex: /[.]js|[.].js.map$/ }),
      postcssPlugin({
        minimize: minify,
        extract: 'vuestic-ui.css',
        include: 'src/styles/**/*.scss',
      }),
      nodeResolvePlugin(),
      copyPlugin({
        targets: [
          { src: `${inputPathWithoutFilename}/**/*.scss`, dest: `${outDir}/styles/` },
        ],
      }),
    ],
  })
}
