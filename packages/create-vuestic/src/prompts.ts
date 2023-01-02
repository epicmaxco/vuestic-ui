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
      { title: 'Vite', value: 'spa' },
      { title: 'Nuxt', value: 'ssr' },
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
