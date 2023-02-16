import { useUserAnswers } from '../composables/useUserAnswers';
import { execp } from './../utils/exacp';

export const initGit = async () => {
  const { runGitInit, projectName } = await useUserAnswers()

  if (!runGitInit) { return }

  return execp('git init', {
    cwd: `${process.cwd()}/${projectName}`,
  })
}
