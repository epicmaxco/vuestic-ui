import chalk from "chalk"
import { logo } from "./arts"
import { getUserAnswers } from "./prompts"
import { onError } from './on-error'
import { scaffoldProject } from "./steps/1.scaffoldProject"

export const main = async () => {
  console.log(chalk.cyanBright(logo))

  const answers = await getUserAnswers()

  scaffoldProject(answers)
}

main()
  .catch(onError)
