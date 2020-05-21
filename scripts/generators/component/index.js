/**
 * Documents page Generator
 */

/* eslint strict: ["off"] */

'use strict'

module.exports = {
  description: 'Add a documentation page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'test',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }

        return 'The name is required'
      },
    },
    {
      type: 'confirm',
      name: 'wantDocsOnly',
      default: false,
      message: 'Do you want only documentation page for the component?',
    },
  ],
  actions: data => {
    const actions = []

    actions.push({
      type: 'gitCheck',
      abortOnFail: true,
    })

    // Generate docs
    const docsBasePath = `${process.cwd()}/packages/docs/`
    const createDocsActions = [
      {
        type: 'add',
        path: `${docsBasePath}/pages/index/{{camelCase name}}.vue`,
        templateFile: './component/docPage.vue.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${docsBasePath}/components/page-configs/va-{{kebabCase name}}/api-options.ts`,
        templateFile: './component/api-options.ts.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${docsBasePath}/components/page-configs/va-{{kebabCase name}}/page-config.ts`,
        templateFile: './component/page-config.ts.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${docsBasePath}/examples/va-{{kebabCase name}}/Example.vue`,
        templateFile: './component/Example.vue.hbs',
        abortOnFail: false,
      },
      {
        type: 'addTranslations',
        path: `${docsBasePath}/locales`,
        abortOnFail: false,
      },
    ]

    actions.push(...createDocsActions)

    // Generate ui component
    const uiBasePath = `${process.cwd()}/packages/ui/src`
    const createUiActions = [
      {
        type: 'add',
        path: `${uiBasePath}/components/vuestic-components/va-{{kebabCase name}}/Va{{properCase name}}.vue`,
        templateFile: './component/Component.vue.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${uiBasePath}/components/vuestic-components/va-{{kebabCase name}}/Va{{properCase name}}.demo.vue`,
        templateFile: './component/Component.demo.vue.hbs',
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `${uiBasePath}/components/vuestic-components/va-{{kebabCase name}}/tests/Va{{properCase name}}.spec.ts`,
        templateFile: './component/Component.spec.ts.hbs',
        abortOnFail: false,
      },
    ]

    if (!data.wantDocsOnly) {
      actions.push(...createUiActions)
    }

    actions.push({
      type: 'gitAdd',
      uiPath: uiBasePath,
      docsPath: docsBasePath,
    })

    return actions
  },
}
