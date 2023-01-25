import { useUserAnswers } from '../composables/useUserAnswers';
import { getPackageManagerName } from '../utils/package-manager';
import { execp } from '../utils/exacp';

export const installDeps = async () => {
  const { runInstall, projectName } = await useUserAnswers()

  if (!runInstall) { return }

  const packageManager = getPackageManagerName()

  return execp(`${packageManager} install`, {
    cwd: `${process.cwd()}/${projectName}`,
  })
}
