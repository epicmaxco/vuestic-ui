import chalk from "chalk"
import { logo } from "./arts"
import { onError } from './on-error'
import { useUserAnswers } from "./composables/useUserAnswers"
import { scaffoldProject } from "./steps/1.scaffoldProject"
import { addVuestic } from './steps/2.addVuestic'
import { cleanDir } from "./steps/0.cleanDir"

export const main = async () => {
  console.log(chalk.cyanBright(logo))

  await cleanDir()

  const answers = await useUserAnswers()

  await scaffoldProject(answers)
  await addVuestic(answers)
}

main()
  .catch(onError)
