const fs = require('fs')
const semver = require('semver')
const path = require('path')

module.exports = {
  bumpPackageJsonVersion: (filePath: string) => {
    // Bump patch .version in package.json.
    const packageJsonPath = path.resolve(__dirname, filePath)
    const packageJson: { version: string } = JSON.parse(fs.readFileSync(packageJsonPath))
    packageJson.version = semver.inc(packageJson.version, 'patch')
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  },
  getPackageJsonVersion: (): string => {
    const packageJsonPath = path.resolve(__dirname, '../package.json')
    return JSON.parse(fs.readFileSync(packageJsonPath)).version
  },
  executeCommand: (command: string): Promise<void> => {
    const { exec } = require('child_process')

    let _resolve: any
    let _reject: any
    exec(command, (err: any, stdout: any, stderr: any) => {
      if (err) {
        // on error
        _reject(err)
      } else {
        // the *entire* stdout and stderr (buffered)
        _resolve(`stdout: ${stdout} \n stderr: ${stderr}`)
      }
    })

    return new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
  },
}
