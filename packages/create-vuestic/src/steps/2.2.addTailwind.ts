import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"
import { useFiles } from '../composables/useFiles';

const installInVite = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const css = resolveCorrectExt('src/assets/main', ['css', 'scss', 'sass'])

  return Promise.all([
    addFile('tailwind.config.mjs', `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}
`.trim()),
    addFile('postcss.config.mjs', `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`.trim()),
    replaceFileContent(css!, (content) =>
      content.replace("@import './base.css';", `
@import './base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim())
    )
  ])
}

const installInNuxt = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const nuxtConfig = resolveCorrectExt('nuxt.config', ['ts', 'js'])

  return Promise.all([
    addFile('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}
`.trim()),
    addFile('./assets/css/main.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim()
    ),
    replaceFileContent(nuxtConfig!, (content) =>
      content.replace('export default defineNuxtConfig({', `
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
`.trim())
    ),
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
      dependencies: {
        '@vuestic/tailwind': versions['@vuestic/tailwind'],
      },
      devDependencies: {
        tailwindcss: versions['tailwindcss'],
        autoprefixer: versions['autoprefixer'],
        postcss: versions['postcss'],
      }
    }),
  ])
}
