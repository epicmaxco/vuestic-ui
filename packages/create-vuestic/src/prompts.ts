import { definePrompts, createPrompts } from './utils/define-prompts';
import { getPackageManagerName } from './utils/package-manager';
import { isProjectExists } from './utils/is-project-exists';
import chalk from 'chalk';
import { PromptType } from 'prompts';

const skipVuesticAdmin = <T extends PromptType>(cb: T) => (type, answers, rest) => {
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
    name: 'projectName',
    message: 'Project name',
    initial: 'vuestic-app',
  },
  {
    type: (prev) => isProjectExists(prev) ? 'confirm' : null,
    name: 'removeProject',
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
    type: 'select',
    name: 'projectType',
    message: 'Project type',
    initial: 0,
    choices: [
      { title: 'create-vue', value: 'create-vue' as const },
      { title: 'nuxt', value: 'nuxt' as const },
      { title: 'Vuestic Admin', value: 'vuestic-admin' as const },
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
    type: skipVuesticAdmin('multiselect'),
    name: 'vuesticFeatures',
    message: 'Vuestic features',
    initial: 0,
    choices: [
      { title: 'AG Grid', value: 'agGrid' as const, description: 'You can configure it later' },
      { title: 'Tree shaking', value: 'treeShaking' as const, description: 'You can configure it later' },
    ],
  },
  {
    type: skipVuesticAdminFn((prev) => prev.includes('treeShaking') ? 'multiselect' : null),
    name: 'treeShaking',
    message: 'Vuestic tree shaking',
    initial: 0,
    choices: [
      { title: 'grid.css', value: 'grid' as const },
      { title: 'typography.css', value: 'typography' as const},
      { title: 'normalize.css', value: 'normalize' as const },
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
