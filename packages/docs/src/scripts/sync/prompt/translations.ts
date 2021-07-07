import { PlopGeneratorConfig } from 'node-plop'

module.exports = {
  description: 'Synchronizing Translation Files',
  prompts: [],
  actions: () => [
    {
      type: 'gitCheck',
      abortOnFail: false,
    },
    {
      type: 'syncTranslations',
      path: `${process.cwd()}/src/locales`,
      abortOnFail: false,
    },
  ],
} as PlopGeneratorConfig
