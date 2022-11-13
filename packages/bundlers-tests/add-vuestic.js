import {spawn} from 'child_process'
const addVueCli = spawn('yarn', ['global', 'add', '@vue/cli'])

function addVuestic() {
  const process = spawn('vue', ['add', 'vuestic-ui'])

  process.stdout.on('data', data => {
    console.log(data.toString())

    if (data.toString().includes('Still proceed')) {
      console.log('hey!')
      process.stdin.cork()
      process.stdin.write('y\n')
      process.stdin.uncork()
    }

    if (data.toString().includes('Use treeshaking? You can configure it later.')) {
      console.log('hey!')
      process.stdin.cork()
      process.stdin.write('y\n')
      process.stdin.uncork()
    }

    if (data.toString().includes('Select CSS features that you want to use')) {

    }
  })

  process.on('exit', code => {
    console.log('vuestic add finished!')
  })
}

addVueCli.stdout.on('data', data => {
  console.log(data.toString())
})

addVueCli.on('exit', code => {
  console.log(code)
  if (code !== 0) {
    console.rror('Can\'t add vue/cli')
    return
  }

  addVuestic()
})
