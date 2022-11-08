const { spawn } = require("child_process")
const devServerProcess = spawn("yarn", ['workspace', 'docs', 'serve'])
const DEV_SERVER_SUCCESSFULLY_RUNNING_MESSAGE = 'App running at:'

const startCypressTesting = () => {
  const testProcess = spawn('yarn', ['workspace', 'bundler-test', 'test:manual'])

  testProcess.stdout.on('data', data => {
    console.log('Cypress message: ', data.toString())
  })
  testProcess.on('exit', code => {
    console.log('Cypress exit code: ', code)

    if (code === 0) {
      console.log('Test passed!')
      devServerProcess.kill()
      console.log('Dev server closed')
    }
  })
}

devServerProcess.stdout.on('data', (data) => {
  if (data.includes(DEV_SERVER_SUCCESSFULLY_RUNNING_MESSAGE)) {
    console.log('Dev server running, not bad!')
    console.log('Start cypress testing.')

    startCypressTesting()
  }
});
