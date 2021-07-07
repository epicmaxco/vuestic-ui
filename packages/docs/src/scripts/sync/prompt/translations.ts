import { PlopGeneratorConfig } from 'node-plop'

module.exports = {
  createTranslationSyncPrompt: (codes: string[]) => ({
    description: 'Synchronizing Translation Files',
    prompts: [
      {
        type: 'input',
        name: 'code',
        message: `What's the locale code in which will be sync (available: ${codes.join(', ')})?`,
        validate: (v: string): boolean | string => {
          if (!v) {
            return 'The locale code is required'
          }
          if (!codes.includes(v)) {
            return 'Invalid locale code'
          }

          return true
        },
      },
      {
        type: 'confirm',
        name: 'withWarn',
        default: false,
        message: `Add the special character '[!]' to added lines?`,
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
