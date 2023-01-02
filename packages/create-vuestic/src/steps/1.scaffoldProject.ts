import { resolvePath } from './../utils/resolve-path';
import { withSpinner } from './../utils/with-spinner';
import { UserAnswers } from './../prompts';
import { createVue } from "../generators/create-vue"
import { createNuxt3 } from "../generators/create-nuxt"

export const scaffoldProject = async (options: UserAnswers) => {
  const { projectName, projectType, projectFeatures = [] } = options

  const path = resolvePath(process.cwd(), projectName)

  if (projectType === 'create-vue') {
    await withSpinner(`Creating Vue 3 project in ${path}`, () => createVue(projectName, projectFeatures))
  } else if (projectType === 'nuxt') {
    await withSpinner(`Creating Nuxt project in ${path}`, () => createNuxt3(projectName))
  }
}
