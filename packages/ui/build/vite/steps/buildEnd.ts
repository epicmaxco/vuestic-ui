import {
  rmSync,
  statSync,
  existsSync,
  renameSync,
  unlinkSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
} from 'fs'
import { readDirRecursive } from '../common-config'

export const buildEnd = () => {
  // moving common css (resources & components styles) to the dist root
  const cjsStylesPath = './dist/cjs/style.css'
  existsSync(cjsStylesPath) && renameSync(cjsStylesPath, './dist/vuestic-ui.css')

  // Add css modules code to all styles
  const cssModules = readFileSync('./dist/styles/index.css')
  appendFileSync('./dist/vuestic-ui.css', cssModules)

  // deleting common css double
  const iifeStylesPath = './dist/iife/style.css'
  existsSync(iifeStylesPath) && unlinkSync(iifeStylesPath)

  // deleting empty styles files, renaming others
  const stylesFiles = readDirRecursive('./dist/styles')
  stylesFiles.forEach((file: string) => statSync(file).size <= 1 && rmSync(file))
}
