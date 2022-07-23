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
import { exec } from 'child_process'
import { readDirRecursive, isComponentsName } from './utils.mjs'

export const $ = (command: string): Promise<string> => {
  let _resolve: any
  let _reject: any
  exec(command, (err: any, stdout: any, stderr: any) => {
    if (err) {
      // on error
      _reject(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      _resolve(stdout.trim())
    }
  })

  return new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
}

(async () => {
  // removing dist dir before we start
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true })
  }

  // making esm-node (mjs) build separately because for some reasons it has conflicts with styles build
  await $('vite build --config ./build/vite/configs/vite.mjs.js')

  // parallel build for all formats
  await Promise.all([
    $('vite build --config ./build/vite/configs/vite.cjs.js'),
    $('vite build --config ./build/vite/configs/vite.iife.js'),
    $('vite build --config ./build/vite/configs/vite.esm.js'),
    $('vite build --config ./build/vite/configs/vite.styles.js'),
    $('vite build --config ./build/vite/configs/vite.styles-essential.js'),
    $('npm run build:types'),
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
          appendFileSync(currentPath, `\n import './${componentCssFilename}'`)
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
