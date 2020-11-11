/* eslint strict: ["off"] */

'use strict'

import { PlopGeneratorConfig } from 'node-plop'

module.exports = {
  description: 'Generate boilerplate for translation. Includes: translation folder, translation json and language button.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the language name (ex.: English, Русский, 中文)?',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }

        return 'The language name is required'
      },
    },
    {
      type: 'input',
      name: 'code',
      message: 'What\'s the iso language code (ex.: en, ru, cn)?',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }

        return 'The code is required'
      },
    },
  ],
  actions: () => {
    const actions = []

    actions.push({
      type: 'gitCheck',
      abortOnFail: false,
    })

    // Generate docs
    const docsBasePath = process.cwd()
    const createDocsActions = [
      {
        type: 'addTranslations',
        path: `${docsBasePath}/locales`,
        abortOnFail: false,
      },
      {
        type: 'addLanguage',
        path: docsBasePath,
        abortOnFail: false,
      },
    ]

    actions.push(...createDocsActions)

    return actions
  },
} as PlopGeneratorConfig
