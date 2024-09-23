import { useUserAnswers } from '../composables/useUserAnswers';
import { execp } from './../utils/exacp';
import { resolvePath } from "../utils/resolve-path"

export const initGit = async () => {
  const { runGitInit, projectName } = await useUserAnswers()

  if (!runGitInit) { return }

  return execp('git init', {
    cwd: resolvePath(process.cwd(), projectName)!,
  })
}
