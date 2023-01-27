import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"

export const addAgGrid = async (options: UserAnswers) => {
  const { vuesticFeatures } = options
  if (vuesticFeatures && !vuesticFeatures.includes('agGrid')) {
    return
  }

  const { addDependency } = await usePackageJson()
  // TODO: Not sure about versions here
  addDependency('ag-grid-community', 'latest')
  addDependency('ag-grid-vue', 'latest')
  addDependency('@vuestic/ag-grid-theme', 'latest')
}
