/* eslint strict: ["off"] */

'use strict'

import { PlopGeneratorConfig } from 'node-plop'

module.exports = {
  description: 'Generate boilerplate for page. Includes: documentation page, page config.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the page name (ex.: installationGuide)?',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }

        return 'The name is required'
      },
    },
    {
      type: 'list',
      name: 'category',
      choices: ['introduction', 'gettingStarted', 'styles', 'uiElements', 'contribution', 'services', 'extensions'],
      message: 'What is the page category?',
    },
  ],
  actions: () => {
    const actions = []

    actions.push({
      type: 'gitCheck',
      abortOnFail: false,
    })

    // Generate docs
    const docsBasePath = `${process.cwd()}/src`
    const createDocsActions = [
      {
        type: 'add',
        path: `${docsBasePath}/pages/{{kebabCase category}}/{{kebabCase name}}.vue`,
        templateFile: './docspage/doc-page.vue.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${docsBasePath}/page-configs/{{kebabCase category}}/{{kebabCase name}}/page-config.ts`,
        templateFile: './docspage/page-config.ts.hbs',
        abortOnFail: false,
      },
      {
        type: 'addTranslations',
        path: `${docsBasePath}/locales`,
        abortOnFail: false,
      },
      {
        type: 'addRoutes',
        path: docsBasePath,
        abortOnFail: false,
      },
    ]

    actions.push(...createDocsActions)

    return actions
  },
} as PlopGeneratorConfig
