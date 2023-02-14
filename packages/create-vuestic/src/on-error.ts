import chalk from 'chalk'
import { error } from './arts'

const BUG_REPORT_LINK = 'https://github.com/epicmaxco/vuestic-ui/issues/new?assignees=&labels=BUG%2CEXTERNAL&template=bug-template.md&title=[create-vuestic]'

export const onError = (err: Error) => {
  if (err.message === 'Cancelled') {
    chalk.bgBlueBright("Aborting...")
    process.exit(0)
  }

  console.log(chalk.cyanBright(error))

  console.log('An unknown error has occurred. Please open an issue on github with the below:')
  console.log(chalk.blue(BUG_REPORT_LINK))

  console.log()
  console.log(chalk.redBright(err))
  console.log(chalk.gray(err.stack))
  process.exit(1)
}
