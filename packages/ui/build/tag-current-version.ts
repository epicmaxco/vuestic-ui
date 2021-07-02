const { getPackageJsonVersion } = require('utils')

const executeCommand = (command: string): Promise<void> => {
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
}

(async () => {
  const tagName = getPackageJsonVersion()
  await executeCommand(`git tag ${tagName}`)
  console.log(`run "git push && git push origin ${tagName}"`)

  // TODO :/ Requires accesses, which process doesn't have.
  // await executeCommand(`git push origin ${tagName}`)
})()
