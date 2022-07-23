import { lstatSync, readdirSync } from 'fs'

export const readDirRecursive = (path) => {
  return readdirSync(path)
    .reduce((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}

export const isComponentsName = (filename) => {
  return /Va.*\.js$|mjs$/.test(filename)
}
