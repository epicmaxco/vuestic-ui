import chalk from "chalk"

export const primaryColor = (text: string) => {
  return chalk.hex('#154EC1')(text)
}

export function devWarn() {
  console.log('')
  console.log(chalk.yellowBright('  Warning:'))
  console.log(`  You're using ${primaryColor('@vuestic/compiler')}. It is in active development stage.`)
  console.log()
  console.log('  Make sure to report any issues you encounter.\n')

  console.log(`  - Dev Docs: ${primaryColor('https://develop.ui.vuestic.dev/')}`)
  console.log(`  - Discord:  ${primaryColor('https://discord.gg/u7fQdqQt8c')}`)
  console.log(`  - Github:   ${primaryColor('https://github.com/epicmaxco/vuestic-ui')}`)

  console.log('')
}
