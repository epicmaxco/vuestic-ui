#!/usr/bin/env node
import chalk from "chalk"
import { logo, primaryColor } from "./arts"
import { onError } from './on-error'
import { useUserAnswers } from "./composables/useUserAnswers"
import { cleanDir } from "./steps/0.cleanDir"
import { scaffoldProject } from "./steps/1.scaffoldProject"
import { addVuestic } from './steps/2.addVuestic'
import { addAgGrid } from './steps/2.1.addAgGrid'
import { initGit } from "./steps/3.initGit"
import { installDeps } from "./steps/4.installDeps"

export const main = async () => {
  console.log(primaryColor(logo))
  console.log(primaryColor('   V U E S T I C'))
  console.log()

  await cleanDir()

  const answers = await useUserAnswers()

  await scaffoldProject(answers)
  await addVuestic(answers)
  await addAgGrid(answers)
  await initGit()
  await installDeps()

  console.log(`${chalk.greenBright('Success!')} Created ${answers.projectName}`)

  console.log()
  console.log(`  - Docs:    ${primaryColor('https://vuestic.dev/')}`)
  console.log(`  - Discord: ${primaryColor('https://discord.gg/u7fQdqQt8c')}`)
  console.log(`  - Github:  ${primaryColor('https://github.com/epicmaxco/vuestic-ui')}`)
  console.log('\nRun:')
  console.log(chalk.green(`  cd ${answers.projectName}\n`))

}

main()
  .catch(onError)
