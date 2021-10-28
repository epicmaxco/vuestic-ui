import { readdirSync, existsSync, mkdirSync, writeFile } from 'fs'
import { resolve, relative, dirname } from 'path'
import sass from 'sass'

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
    name: 'rollup-transofrm-scss',
    closeBundle: async (err) => {
      if (err) { return }

      const inputFiles = getInputFiles(inputDir, filter)

      const outputFiles = inputFiles.map((file) => {
        return resolve(outDir, relative(inputDir, file))
          .split('.')
          .slice(0, -1)[0] + '.css'
      })

      await Promise.all(inputFiles.map((filePath, index) => {
        return new Promise((resolve) => {
          const sassResult = sass.renderSync({ file: filePath })

          if (sassResult.css.toString().length === 0) { return }

          const outputFileDir = dirname(outputFiles[index])

          if (!existsSync(outputFileDir)) { mkdirSync(outputFileDir) }

          writeFile(outputFiles[index], sassResult.css, () => resolve())
        })
      }))
    },
  }
}
