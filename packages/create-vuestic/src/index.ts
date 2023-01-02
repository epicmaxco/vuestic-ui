import chalk from "chalk"
import { logo } from "./arts"
import { onError } from './on-error'
import { useUserAnswers } from "./composables/useUserAnswers"
import { cleanDir } from "./steps/0.cleanDir"
import { scaffoldProject } from "./steps/1.scaffoldProject"
import { addVuestic } from './steps/2.addVuestic'
import { addAgGrid } from './steps/2.1.addAgGrid'
import { initGit } from "./steps/3.initGit"
import { installDeps } from "./steps/4.installDeps"


export const main = async () => {
  console.log(chalk.cyanBright(logo))

  await cleanDir()

  const answers = await useUserAnswers()

  console.log('')

  await scaffoldProject(answers)
  await addVuestic(answers)
  await addAgGrid(answers)
  await initGit()
  await installDeps()

  console.log(`${chalk.greenBright('Success!')} Created ${answers.projectName}`)
}

main()
  .catch(onError)
