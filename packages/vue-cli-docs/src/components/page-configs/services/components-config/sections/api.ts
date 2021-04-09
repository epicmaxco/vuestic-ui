import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { te, t } from '../../../../../helpers/I18nHelper'

const prefix = (text: string) => {
  const stringPath = `componentsConfig.api.${text}`
  // Check if exists
  return te(stringPath) ? t(stringPath) : ''
}

export const config = [
  DocsHelper.subtitle(prefix('title')),

  DocsHelper.headline(prefix('types')),
  DocsHelper.table(
    ['Name', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['ComponentConfig', '{ [componentName: string]: string; }', prefix('ComponentConfig')],
    ],
  ),
]
