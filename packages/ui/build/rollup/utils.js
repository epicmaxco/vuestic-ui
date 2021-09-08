import { resolve } from 'path'
import { readFileSync } from 'fs'

function getPackageJson () {
  const packageJsonPath = resolve(__dirname, './package.json')
  return JSON.parse(readFileSync(packageJsonPath))
}

const packageJSON = getPackageJson()

export const dependencies = Object.keys(packageJSON.dependencies)
export const peerDependencies = Object.keys(packageJSON.peerDependencies)
