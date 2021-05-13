import { DocsHelper } from '../../../../../helpers/DocsHelper'

export const config = [
  DocsHelper.subtitle('componentsConfig.api.title'),

  DocsHelper.headline('componentsConfig.api.types'),
  DocsHelper.table(
    ['Name', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['ComponentConfig', '{ [componentName: string]: string; }', 'componentsConfig.api.ComponentConfig'],
    ],
  ),
]
