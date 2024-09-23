import { useUserAnswers } from '../composables/useUserAnswers';
import { getPackageManagerName } from '../utils/package-manager';
import { execp } from '../utils/exacp';
import { withSpinner } from '../utils/with-spinner';
import { resolvePath } from "../utils/resolve-path"

export const installDeps = async () => {
  const { runInstall, projectName } = await useUserAnswers()

  if (!runInstall) { return }

  const packageManager = getPackageManagerName()

  return await withSpinner('Installing dependencies...', async () => {
    await execp(`${packageManager} install`, {
      cwd: resolvePath(process.cwd(), projectName)!,
    })
  })
  return
}
