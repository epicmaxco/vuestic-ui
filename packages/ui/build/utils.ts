const fs = require('fs')
const semver = require('semver')
const path = require('path')

const bumpPackageJsonVersion = (filePath: string) => {
  // Bump patch .version in package.json.
  const packageJsonPath = path.resolve(__dirname, filePath)
  const packageJson: { version: string } = JSON.parse(fs.readFileSync(packageJsonPath))
  packageJson.version = semver.inc(packageJson.version, 'patch')
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

const getPackageJsonVersion = (): string => {
  const packageJsonPath = path.resolve(__dirname, '../package.json')
  return JSON.parse(fs.readFileSync(packageJsonPath)).version
}

module.exports = {
  bumpPackageJsonVersion,
  getPackageJsonVersion,
}
