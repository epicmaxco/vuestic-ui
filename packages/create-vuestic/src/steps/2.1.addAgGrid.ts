import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"

export const addAgGrid = async (options: UserAnswers) => {
  const { vuesticFeatures } = options
  if (vuesticFeatures && !vuesticFeatures.includes('agGrid')) {
    return
  }

  const { addDependency } = await usePackageJson()
  
  await Promise.all([
    addDependency('@vuestic/ag-grid-theme',  versions['@vuestic/ag-grid-theme'])
  ])
}
