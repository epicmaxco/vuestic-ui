const {
  bumpPackageJsonVersion,
  executeAndLog,
  getPackageJsonVersion,
  bumpGithubTemplateVersions,
  bumpVersionInGenerators,
  updateVersion,
} = require('./utils.ts')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

;(async () => {
  await executeAndLog('git checkout develop')

  const currentVersion = getPackageJsonVersion()
  const newVersion = updateVersion(currentVersion, argv.type || 'patch')

  console.log(`Bumping version to ${newVersion}`)
  // ui
  bumpPackageJsonVersion('../package.json', newVersion)
  // vue-cli-plugin
  bumpVersionInGenerators(newVersion)
  // root
  bumpGithubTemplateVersions(newVersion)

  const tagName = `v${newVersion}`
  await executeAndLog(`git commit -am "chore: bump version to ${tagName}"`)
  await executeAndLog(`git tag ${tagName}`)
  await executeAndLog('git push')
  await executeAndLog(`git push origin ${tagName}`)

  console.log('Successfully executed automated tasks, please perform remaining manual tasks.')
})()
