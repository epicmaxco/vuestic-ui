import {
  rmSync,
  statSync,
  existsSync,
  renameSync,
  unlinkSync,
  readFileSync,
  appendFileSync,
} from 'fs'
import { join, parse } from 'pathe'
import { readDirRecursive } from '../utils/read-dir-recursive'

export const postBuild = (options: {
  cwd: string,
  entry?: string
}) => {
  const { cwd, entry } = options
  const libName = parse((entry || 'src/main.ts').split('/').pop() || 'main.ts').name

  // moving common css (resources & components styles) to the dist root
  const cjsStylesPath = join(cwd, './dist/cjs/style.css')
  existsSync(cjsStylesPath) && renameSync(cjsStylesPath, join(cwd, `./dist/${libName}.css`))
  // deleting iife css double
  const iifeStylesPath = join(cwd, './dist/iife/style.css')
  existsSync(iifeStylesPath) && unlinkSync(iifeStylesPath)

  // Add css modules code to all styles
  // const cssModules = readFileSync('./dist/styles/index.css')
  // appendFileSync('./dist/vuestic-ui.css', cssModules)

  // // deleting empty styles files, renaming others
  // const stylesFiles = readDirRecursive('./dist/styles')
  // stylesFiles.forEach((file: string) => statSync(file).size <= 1 && rmSync(file))
}
