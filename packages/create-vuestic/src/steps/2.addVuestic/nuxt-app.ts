import { useUserAnswers } from './../../composables/useUserAnswers';
import { readFile, writeFile } from "fs/promises"
import { usePackageJson } from "../../composables/usePackageJson"
import { resolvePath } from "../../utils/resolve-path"
import { insertNuxtModule } from './insert-nuxt-module';

export const addVuesticToNuxtApp = async () => {
  // Install vuestic-ui
  const { addDevDependency } = await usePackageJson()
  addDevDependency('@vuestic/nuxt', 'latest')

  const { projectName } = await useUserAnswers()

  // Add plugin
  const nuxtConfigPath = resolvePath(process.cwd(), projectName, 'nuxt.config.js') || resolvePath(process.cwd(), projectName, 'nuxt.config.ts')

  if (!nuxtConfigPath) {
    throw new Error('Unexpected error: Could not find nuxt.config.js or nuxt.config.ts')
  }

  let nuxtConfigSource = await readFile(nuxtConfigPath, 'utf-8')
  nuxtConfigSource = insertNuxtModule(nuxtConfigSource)
  await writeFile(nuxtConfigPath, nuxtConfigSource)
}
