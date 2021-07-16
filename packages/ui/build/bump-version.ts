const { bumpPackageJsonVersion, executeCommand, getPackageJsonVersion } = require('./utils.ts')

;(async () => {
  // root
  bumpPackageJsonVersion('../../../package.json')
  // ui
  bumpPackageJsonVersion('../package.json')

  const tagName = `v${await getPackageJsonVersion()}`
  await executeCommand(`git tag ${tagName}`)
  console.log(`run "git push && git push origin ${tagName}"`)

  // TODO :/ Requires accesses, which process doesn't have.
  // await executeCommand(`git push origin ${tagName}`)
})()
