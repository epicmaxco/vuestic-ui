import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"

export const addAgGrid = async (options: UserAnswers) => {
  const { vuesticFeatures } = options
  if (vuesticFeatures && !vuesticFeatures.includes('agGrid')) {
    return
  }

  const { addDependency } = await usePackageJson()
  // TODO: Not sure about versions here
  addDependency('ag-grid-community', versions['ag-grid-community'])
  addDependency('ag-grid-vue', versions['ag-grid-vue'])
  addDependency('@vuestic/ag-grid-theme',  versions['@vuestic/ag-grid-theme'])
}
