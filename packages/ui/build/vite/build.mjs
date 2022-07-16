#!/usr/bin/env zx

import { $ } from 'zx'
import fs, {
  rmSync,
  statSync,
  existsSync,
  renameSync,
  unlinkSync,
  readdirSync,
  appendFileSync,
} from 'fs'
import { readDirRecursive, kebabToPascalCase } from './utils.mjs'

// removing dist dir before we start
if (fs.existsSync('./dist')) {
  fs.rmSync('./dist', { recursive: true })
}

// making esm-node (mjs) build separately because for some reasons it has conflicts with styles build
await $`vite build --config ./build/vite/configs/vite.mjs.js`

// parallel build for all formats
await Promise.all([
  $`vite build --config ./build/vite/configs/vite.cjs.js`,
  $`vite build --config ./build/vite/configs/vite.iife.js`,
  $`vite build --config ./build/vite/configs/vite.esm.js`,
  $`vite build --config ./build/vite/configs/vite.styles.js`,
  $`vite build --config ./build/vite/configs/vite.styles-essential.js`,
  $`npm run build:types`,
])

// adding css imports to esm/esm-node build components
const proceedCssImport = (buildName) => {
  const componentsDirectoryPath = `./dist/${buildName}/src/components`
  const isMjsFormat = buildName === 'esm-node'

  readdirSync(componentsDirectoryPath)
    .forEach((folderName) => {
      const currentPath = `${componentsDirectoryPath}/${folderName}`
      const componentsName = kebabToPascalCase(folderName)

      const componentFilePath = `${currentPath}/${componentsName}.${isMjsFormat ? 'mjs' : 'js'}`
      const componentCssPath = `${currentPath}/${componentsName}.css`

      existsSync(componentFilePath) &&
      existsSync(componentCssPath) &&
      appendFileSync(componentFilePath, `\n import './${componentsName}.css'`)
    })
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
stylesFiles.forEach((file) => statSync(file).size <= 1 && rmSync(file))
