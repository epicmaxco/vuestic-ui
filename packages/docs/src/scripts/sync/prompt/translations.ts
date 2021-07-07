import { PlopGeneratorConfig } from 'node-plop'

module.exports = {
  createTranslationSyncPrompt: (codes: string[]) => ({
    description: 'Synchronizing Translation Files',
    prompts: [
      {
        type: 'input',
        name: 'code',
        message: `What's the locale code (available: ${codes.join(', ')}; by default: en)?`,
        validate: (v: string): boolean | string => {
          if (!v || codes.includes(v)) {
            return true
          }

          return 'Invalid locale code'
        },
      },
    ],
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
  } as PlopGeneratorConfig)
}
