import { execp } from './../utils/exacp';

type CreateVueFeature = 'ts' | 'jsx' | 'router' | 'pinia' | 'tests' | 'vitest' | 'cypress' | 'playwright' | 'eslint'

export const createVue = async (projectName: string, features: CreateVueFeature[]) => {
  const argsString = features
    .map((feature) => `--${feature}`)
    .join(' ')

  // --default in case no option is selected, so default would be no options
  // --force in case folder already exists
  // --yes to skip prompts
  const command = `npm create vue@3 --yes -- ${argsString} ${projectName} --default --force`

  return execp(command)
}
