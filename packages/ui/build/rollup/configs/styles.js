import { defineConfig } from 'rollup'
import postcssPlugin from 'rollup-plugin-postcss'
import deleteJunkPlugin from '../plugins/rollup-delete-junk'
import transformScssPlugin from '../plugins/rollup-transofrm-scss'
import copyPlugin from 'rollup-plugin-copy'

/** Used for tree-shaking. It creates separate modules in ESM format, that can be tree-shakable by any bundler. */
export function createStylesConfig ({ input, outDir = 'dist/', minify = false }) {
  const inputPathWithoutFilename = input.split('/').slice(0, -1).join('/')

  const transformSrc = (src) => `./${src.replace(inputPathWithoutFilename, '')}`

  return defineConfig({
    input,
    output: {
      dir: outDir,
    },

    plugins: [
      postcssPlugin({
        minimize: minify,
        extract: 'vuestic-ui.css',
        include: 'src/styles/**/*.scss',
      }),
      transformScssPlugin({
        inputDir: inputPathWithoutFilename,
        outDir: `${outDir}/styles`,
        filter: /.*\.scss/,
      }),
      copyPlugin({
        targets: [
          {
            src: `${inputPathWithoutFilename}/**/*.scss`,
            dest: `${outDir}/styles/`,
            rename: (name, extension, src) => transformSrc(src),
          },
        ],
      }),
      deleteJunkPlugin({ dirPath: outDir, deleteFilesRegex: /[.]js|[.].js.map$/ }),
    ],
  })
}
