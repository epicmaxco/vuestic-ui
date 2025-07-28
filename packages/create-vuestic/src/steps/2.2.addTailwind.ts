import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"
import { useFiles } from '../composables/useFiles';

const installInVite = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const css = resolveCorrectExt('src/assets/main', ['css', 'scss', 'sass'])

  return replaceFileContent(css!, (content) =>
      content.replace("@import './base.css';", `
@import './base.css';

@import "tailwindcss";
`.trim())
    )
}

const installInNuxt = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const nuxtConfig = resolveCorrectExt('nuxt.config', ['ts', 'js'])

  return Promise.all([
    addFile('./assets/css/main.css', `
@import "tailwindcss";
`.trim()),
  ])
}

export const addTailwind = async (options: UserAnswers) => {
  const { vuesticFeatures, projectType } = options
  if (vuesticFeatures && !vuesticFeatures.includes('tailwind')) {
    return
  }

  const { addDependencies } = await usePackageJson()

  if (projectType === 'nuxt') {
    await installInNuxt()
  } else if (projectType === 'create-vue') {
    await installInVite()
  }

  await Promise.all([
    addDependencies({
      devDependencies: {
        "@tailwindcss/vite": versions['@tailwindcss/vite'],
        "tailwindcss": versions['tailwindcss'],
      }
    }),
  ])
}
