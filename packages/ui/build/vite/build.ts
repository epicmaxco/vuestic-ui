import fs, {
  rmSync,
  statSync,
  existsSync,
  renameSync,
  unlinkSync,
  readdirSync,
  appendFileSync,
  lstatSync,
} from 'fs'
import { $ } from 'deploy/execute'
import { readDirRecursive, isComponentsName } from './utils.mjs'

(async () => {
  // removing dist dir before we start
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true })
  }

  await Promise.all([
    $('npm run build:types', { successMessage: 'types built' }),
    $('vite build --config ./build/vite/configs/vite.cjs.js', { successMessage: 'cjs built' }),
    $('vite build --config ./build/vite/configs/vite.iife.js', { successMessage: 'iife built' }),
    $('vite build --config ./build/vite/configs/vite.esm.js', { successMessage: 'esm built' }),
    $('vite build --config ./build/vite/configs/vite.mjs.js', { successMessage: 'esm-node built' }),
    $('vite build --config ./build/vite/configs/vite.styles.js', { successMessage: 'styles built' }),
    $('vite build --config ./build/vite/configs/vite.styles-essential.js', { successMessage: 'essential styles built' }),
  ])

  // adding css imports to esm/esm-node build components recursively
  const proceedCssImport = (buildName: string) => {
    const componentsDirectoryPath = `./dist/${buildName}/src/components`

    const cssImportRecursive = (dirPath: string) => {
      readdirSync(dirPath)
        .forEach((entryName) => {
          const currentPath = `${dirPath}/${entryName}`

          if (lstatSync(currentPath).isDirectory()) { return cssImportRecursive(currentPath) }

          if (!isComponentsName(entryName)) { return }

          const componentCssFilename = `${entryName.split('.')[0]}.css`
          const componentCssPath = `${dirPath}/${componentCssFilename}`

          existsSync(currentPath) &&
          existsSync(componentCssPath) &&
          appendFileSync(currentPath, `\nimport './${componentCssFilename}'`)
        })
    }

    cssImportRecursive(componentsDirectoryPath)
  }

  ['esm', 'esm-node'].forEach((buildName) => proceedCssImport(buildName))

  // moving common css (resources & components styles) to the dist root
  const cjsStylesPath = './dist/cjs/style.css'
  existsSync(cjsStylesPath) && renameSync(cjsStylesPath, './dist/vuestic-ui.css')

  // deleting common css double
  const iifeStylesPath = './dist/iife/style.css'
  existsSync(iifeStylesPath) && unlinkSync(iifeStylesPath)

  // deleting empty styles files, renaming others
  const stylesFiles = readDirRecursive('./dist/styles')
  stylesFiles.forEach((file: string) => statSync(file).size <= 1 && rmSync(file))
})()
