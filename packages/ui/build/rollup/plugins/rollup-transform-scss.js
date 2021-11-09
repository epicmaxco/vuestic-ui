import { readdirSync, existsSync, mkdirSync, writeFile } from 'fs'
import { resolve, relative, dirname } from 'path'
import sass from 'sass'
import postcss from 'postcss'
import postcssImport from '../postcss-plugins/postcss-import'
import cssnano from 'cssnano'

const readDirRecursive = (path) => {
  return readdirSync(path, { withFileTypes: true })
    .reduce((acc, file) => {
      return file.isDirectory()
        ? [...acc, ...readDirRecursive(`${path}/${file.name}`)]
        : [...acc, `${path}/${file.name}`]
    }, [])
}

const getInputFiles = (inputDir, filter) => {
  if (filter) {
    return readDirRecursive(inputDir).filter(filePath => filter.test(filePath))
  }
  return readDirRecursive(inputDir)
}

/** This plugin used to remove junk files from dist */
export default function ({
  inputDir = undefined,
  outDir = undefined,
  filter,
}) {
  return {
    name: 'rollup-transform-scss',
    closeBundle: async (err) => {
      if (err) { return }

      const inputFiles = getInputFiles(inputDir, filter)

      const outputFiles = inputFiles.map((file) => {
        return resolve(outDir, relative(inputDir, file))
          .split('.')
          .slice(0, -1)[0] + '.css'
      })

      await Promise.all(inputFiles.map((filePath, index) => {
        return new Promise((resolve, reject) => {
          const sassResult = sass.renderSync({ file: filePath })

          if (sassResult.css.length === 0) { return }

          // Resolve imports from node_modules with postcss
          postcss()
            .use(postcssImport())
            .use(cssnano()) // Minify postcss result and remove comments
            .process(sassResult.css, { from: filePath })
            .then((result) => {
              if (!result || result.content.length === 0) { return }

              const outputFileDir = dirname(outputFiles[index])
              if (!existsSync(outputFileDir)) { mkdirSync(outputFileDir) }

              writeFile(outputFiles[index], result.content, () => resolve())
            })
            .catch((err) => reject(err))
        })
      }))
    },
  }
}
