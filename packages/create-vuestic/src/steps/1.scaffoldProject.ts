import { withSpinner } from './../utils/with-spinner';
import { UserAnswers } from './../prompts';
import { createVue } from "../generators/create-vue"
import { createNuxt3 } from "../generators/create-nuxt"

export const scaffoldProject = async (options: UserAnswers) => {
  const { projectName, projectType, projectFeatures = [] } = options

  if (projectType === 'create-vue') {
    await withSpinner('Creating Vue 3 project...', () => createVue(projectName, projectFeatures))
  } else if (projectType === 'nuxt') {
    await withSpinner('Creating Nuxt project...', () => createNuxt3(projectName))
  }
}
