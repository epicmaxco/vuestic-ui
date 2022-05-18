import { lstatSync, readdirSync } from 'fs'

export default function readDirRecursive (path) {
  return readdirSync(path)
    .reduce((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}
