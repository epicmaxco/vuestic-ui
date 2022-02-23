import { readdirSync, existsSync, lstatSync } from 'fs'
import { resolve } from 'path'

const readDirRecursive = (path) => {
  return readdirSync(path)
    .reduce((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}

export const getInputs = () => {
  const components = readdirSync('./src/components')
    .filter((folderName) => !folderName.startsWith('wip-'))
    .map((folderName) => `./src/components/${folderName}/index.ts`)
    .filter((filePath) => existsSync(filePath))

  const vuesticPlugin = readDirRecursive('./src/vuestic-plugin')

  return [...components, ...vuesticPlugin]
}
