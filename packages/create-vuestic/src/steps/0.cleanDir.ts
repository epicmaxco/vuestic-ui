import { withSpinner } from './../utils/with-spinner';
import { existsSync, rmSync } from "fs"
import { useUserAnswers } from "../composables/useUserAnswers"
import { resolvePath } from "../utils/resolve-path"

export const cleanDir = async () => {
  const { projectName } = await useUserAnswers()

  const projectPath = resolvePath(process.cwd(), projectName)!

  if (existsSync(projectPath)) {
    withSpinner('Deleting previous project', async () => {
      rmSync(projectPath, { recursive: true, force: true })
    })
  }
}
