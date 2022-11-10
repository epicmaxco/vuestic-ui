const {spawn} = require("child_process")
const devServerProcess = spawn("yarn", ['workspace', 'docs', 'serve'])
const DEV_SERVER_SUCCESSFULLY_RUNNING_MESSAGE = '- Local:'

const startCypressTesting = (devServerUrl: string) => {
  const testProcess = spawn('cypress', ['run', '--config', `baseUrl=${devServerUrl}`])

  testProcess.stdout.on('data', data => {
    console.log('Cypress message: ', data.toString())
  })
  testProcess.on('exit', code => {
    console.log('Cypress exit code: ', code)

    if (code === 0) {
      console.log('Test passed!')
    }

    devServerProcess.kill()
    console.log('Dev server closed')
  })
}

devServerProcess.stdout.on('data', (data) => {
  if (data.includes(DEV_SERVER_SUCCESSFULLY_RUNNING_MESSAGE)) {
    let [,serverUrl] = data.toString().match(/.*- Local:.* (htt.+)/)
    serverUrl = serverUrl.trim()

    console.log('Dev server running, not bad!')

    if (!/^http.+\d{4}\/$/.test(serverUrl)) {
      console.error('Can\'t parse where dev server running')
      devServerProcess.kill()
      return
    }

    startCypressTesting(serverUrl)
  }
});
