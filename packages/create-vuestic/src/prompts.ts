import { definePrompts, createPrompts } from './utils/define-prompts';

import { getPackageManagerName } from './utils/package-manager';

const questions = definePrompts([
  {
    type: 'text',
    name: 'projectName',
    message: 'Project name',
    initial: 'my-vuestic-project',
  },
  {
    type: 'select',
    name: 'projectType',
    message: 'Project type',
    initial: 0,
    choices: [
      { title: 'create-vue', value: 'create-vue' as const },
      { title: 'nuxt', value: 'nuxt' as const },
    ],
  },
  {
    type: (prev) => prev === 'create-vue' ? 'multiselect' : null,
    name: 'projectFeatures',
    message: 'Project features',
    initial: 0,
    choices: [
      { title: 'TypeScript', value: 'ts' as const, selected: true, description: 'Vuestic has a great TS support, so we recommend to use it with TS' },
      { title: 'Eslint', value: 'eslint' as const, description: 'for code quality' },
      { title: 'Pinia', value: 'pinia' as const, description: 'for state management' },
      { title: 'Vue router', value: 'router' as const, description: 'for Single Page Application development' },
      { title: 'Vitest', value: 'vitest' as const, description: 'for unit testing' },
      { title: 'Cypress', value: 'cypress' as const, description: 'for End-to-End testing' },
    ],
  },
  {
    type: "confirm",
    name: "runGitInit",
    message: "Initialize a new git repository?",
    initial: true,
  },
  {
    type: "confirm",
    name: "runInstall",
    message: () => {
      const packageManager = getPackageManagerName()
      return `Would you like to run \`${packageManager} install\` after finishing up?`
    },
    initial: true,
  }
])

export const getUserAnswers = async () => {
  return createPrompts(questions)
}

export type UserAnswers = Awaited<ReturnType<typeof getUserAnswers>>
