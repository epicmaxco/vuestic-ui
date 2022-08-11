import { exec } from 'child_process'

const fs = require('fs')
const semver = require('semver')
const path = require('path')

export const bumpGithubTemplateVersions = (newVersion: string) => {
  // Bump patch .version in package.json.
  const bugTemplatePath = path.resolve(__dirname, '../../../.github/ISSUE_TEMPLATE/bug-template.md')
  const bugTemplate = fs.readFileSync(bugTemplatePath, 'utf8')
  const updatedBugTemplate = bugTemplate.replace(/^\*\*Vuestic-ui version:\*\* (.*)$/gm, (line: string, version: string) => {
    return line.replace(version, newVersion)
  })
  if (updatedBugTemplate === bugTemplate) {
    throw new Error('Failed to update .github template version')
  }
  fs.writeFileSync(bugTemplatePath, updatedBugTemplate)
  console.log('.github template version has been updated')
}

export const bumpVersionInGenerators = (newVersion: string) => {
  // Bump patch .version in package.json.
  const generatorPath = path.resolve(__dirname, '../../../packages/vue-cli-plugin/generator/configs/default.js')
  const generator = fs.readFileSync(generatorPath, 'utf8')
  const updatedGenerator = generator.replace(/^\s*'vuestic-ui': '\^([0-9a-z\-.]*)',$/gm, (line: string, version: string) => {
    return line.replace(version, newVersion)
  })
  if (generator === updatedGenerator) {
    throw new Error('Failed to update generator version')
  }
  fs.writeFileSync(generatorPath, updatedGenerator)
  console.log('vue-cli-plugin generator version has been updated')
}

export const bumpPackageJsonVersion = (filePath: string, newVersion: string) => {
  // Bump patch .version in package.json.
  const packageJsonPath = path.resolve(__dirname, filePath)
  const packageJson: { version: string } = JSON.parse(fs.readFileSync(packageJsonPath))
  packageJson.version = newVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('vuestic-ui package.json version has been updated')
}

export const getRecommendedNodeVersion = (): string => {
  const packageJsonPath = path.resolve(__dirname, '../../../.nvmrc')
  return fs.readFileSync(packageJsonPath).toString().trim()
}

export const getPackageJsonVersion = (): string => {
  const packageJsonPath = path.resolve(__dirname, '../../../packages/ui/package.json')
  // Coerce keeps only 1.2.3 from full version string - useful in case we sit on some weird version.
  return semver.coerce(JSON.parse(fs.readFileSync(packageJsonPath)).version)
}

export const executeCommand = (command: string): Promise<string> => {
  const { exec } = require('child_process')

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

export const executeAndLog = async (command: string): Promise<void> => {
  console.log(`Executing command: ${command}`)
  const result = await executeCommand(command)
  console.log(result)
}

export const getCommitHash = () => executeCommand('git rev-parse --short HEAD')
