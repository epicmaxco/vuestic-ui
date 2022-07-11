import { lstatSync, readdirSync, renameSync } from "fs";

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

export const getSplitDataByPath = (filePath) => {
  const splitPath = filePath.split('/')
  const splitFileName = splitPath[splitPath.length - 1].split('.')
  const pathBase = splitPath.slice(0, splitPath.length - 1).join('/')

  return { splitFileName, pathBase }
}

export const kebabToPascalCase = (name) => {
  return name.split('-').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join('')
}

// vite/rollup, for example, generates assets names as `[path]/[name].[hash].[extension]`
export const deleteHashFromFilename = (filePath) => {
  const { splitFileName, pathBase } = getSplitDataByPath(filePath)

  splitFileName.splice(1, 1)
  const newFileName = splitFileName.join('.')

  renameSync(filePath, `${pathBase}/${newFileName}`)
}
