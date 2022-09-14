import { existsSync, readdirSync, readFileSync, writeFileSync, lstatSync } from 'fs'
import { Plugin } from 'vite'

const processFile = (componentPath) => {
  if (!existsSync(componentPath)) { return }

  const componentContent = readFileSync(componentPath, 'utf8')

  writeFileSync(componentPath, componentContent.replace(/import ".*";/gm, ''))
}

export const processFiles = (componentsDir) => {
  readdirSync(componentsDir)
    .forEach((entryName) => {
      const currentPath = `${componentsDir}/${entryName}`

      if (lstatSync(currentPath).isDirectory()) {
        return processFiles(currentPath)
      }

      processFile(currentPath)
    })
}

export const fixImportHell = (): Plugin => {
  let outDir = ''

  return {
    name: 'vuestic:fix-import-hell',

    configResolved: (config) => {
      outDir = config.build.outDir
    },

    closeBundle: () => {
      processFiles(`${outDir}`)
    },
  }
}
