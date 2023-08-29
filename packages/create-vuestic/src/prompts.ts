import { definePrompts, createPrompts } from './utils/define-prompts';
import { getPackageManagerName } from './utils/package-manager';
import { isProjectExists } from './utils/is-project-exists';
import chalk from 'chalk';
import { PromptType } from 'prompts';

const skipVuesticAdmin = <T extends PromptType>(cb: T) => (type: T, answers, rest) => {
  if (answers.projectType === 'vuestic-admin') {
    return null
  }

  return cb
}

const skipVuesticAdminFn = <TT extends PromptType | null>(cb: (...args: any[]) => TT) => (type, answers, rest) => {
  if (answers.projectType === 'vuestic-admin') {
    return null
  }

  return cb(type, answers, rest) as TT
}


const questions = definePrompts([
  {
    type: 'text',
    name: 'projectName' as const,
    message: 'Project name',
    initial: 'vuestic-app',
  },
  {
    type: (prev) => isProjectExists(prev) ? 'confirm' : null,
    name: 'removeProject' as const,
    message: `Project folder already exists. ${chalk.red('Should we remove it')} and init new project?`,
    initial: false,
    onState({ value }) {
      if (!value) {
        console.log(chalk.cyan('\nRemove folder manually and try again.'))
        console.log('Aborting...')
        process.exit(0)
      }
    }
  },
  {
    type: 'select' as const,
    name: 'projectType' as const,
    message: 'Project template',
    initial: 0,
    choices: [
      { title: 'Vuestic Admin', description: 'SPA project based on Vite with predefined Admin Template for quick start', value: 'vuestic-admin' as const },
      { title: 'Create-vue', description: 'Clean project based on Vite (the same as created with create-vue)', value: 'create-vue' as const },
      { title: 'Nuxt', description: 'SPA/SSG/SSR based on Nuxt framework', value: 'nuxt' as const },
    ],
  },
  {
    type: (prev) => prev === 'create-vue' ? 'multiselect' : null,
    name: 'projectFeatures' as const,
    message: 'Create-vue features',
    initial: 0,
    choices: [
      { title: 'TypeScript', value: 'ts' as const, description: 'Vuestic has a great TS support, so we recommend to use it with TS' },
      { title: 'Eslint', value: 'eslint' as const, description: 'for code quality' },
      { title: 'Pinia', value: 'pinia' as const, description: 'for state management' },
      { title: 'Vue router', value: 'router' as const, description: 'for Single Page Application development' },
      { title: 'Vitest', value: 'vitest' as const, description: 'for unit testing' },
      { title: 'Cypress', value: 'cypress' as const, description: 'for End-to-End testing' },
      { title: 'Playwright', value: 'playwright' as const, description: 'for End-to-End testing' },
      { title: 'JSX', value: 'jsx' as const, description: '' },
    ],
  },
  {
    type: skipVuesticAdmin('multiselect' as const),
    name: 'vuesticFeatures' as const,
    message: 'Vuestic features (can be manually added later)',
    initial: 0,
    choices: [
      { title: 'Tailwind', value: 'tailwind' as const, description: 'Install Tailwind CSS for styling. We recommend using tailwind instead of grid.css and normalize.css' },
      { title: 'AG Grid', value: 'agGrid' as const, description: 'Install Vuestic AG Grid theme for complex data tables' },
      { title: 'Tree shaking', value: 'treeShaking' as const, description: 'You will need to register each component manually, but it will decrease bundle size' },
    ],
  },
  {
    type: skipVuesticAdminFn((prev) => prev.includes('treeShaking') && !prev.includes('tailwind') ? 'multiselect' : null),
    name: 'treeShaking' as const,
    message: 'Vuestic CSS modules',
    initial: 0,
    choices: [
      { title: 'typography.css', value: 'typography' as const},
      { title: 'grid.css', value: 'grid' as const, description: 'grid.css is deprecated, use tailwind instead' },
      { title: 'normalize.css', value: 'normalize' as const, description: 'normalize.css is deprecated, use tailwind instead' },
    ],
  },
  {
    type: skipVuesticAdminFn((prev) => prev.includes('treeShaking') && prev.includes('tailwind') ? 'multiselect' : null),
    name: 'treeShaking' as const,
    message: 'Vuestic CSS modules',
    initial: 0,
    choices: [
      { title: 'typography.css', value: 'typography' as const},
    ],
  },
  {
    type: "confirm",
    name: "runGitInit" as const,
    message: "Initialize a new git repository?",
    initial: true,
  },
  {
    type: "confirm",
    name: "runInstall" as const,
    message: () => {
      const packageManager = getPackageManagerName()
      return `Would you like to run \`${packageManager} install\` after finishing up?`
    },
    initial: true,
  }
])

export const getUserAnswers = () => {
  return createPrompts(questions)
}

export type UserAnswers = ReturnType<typeof getUserAnswers>
