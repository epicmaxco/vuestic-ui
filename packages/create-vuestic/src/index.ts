import chalk from "chalk"
import { logo } from "./arts"
import { getUserAnswers } from "./prompts"
import { onError } from './on-error'

export const main = async () => {
  console.log(chalk.cyanBright(logo))
  const { projectName, projectType, runGitInit, runInstall } = await getUserAnswers()
}

main()
  .catch(onError)
