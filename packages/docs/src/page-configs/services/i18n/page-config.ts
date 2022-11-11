import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { getI18nConfigDefaults } from 'vuestic-ui/src/services/i18n/defaults'
import { setupExampleCode, runtimeCodeExample, runtimeVueI18nCodeExample, vueI18nExampleConfig } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('i18n.title'),
  block.paragraph('i18n.description'),

  block.collapse(
    'i18n.config.title',
    [block.code(JSON.stringify(getI18nConfigDefaults(), null, 2))],
  ),

  block.subtitle('i18n.config.changeDefault.title'),
  block.paragraph('i18n.config.changeDefault.description'),
  block.code(setupExampleCode),

  block.subtitle('i18n.runtimeUpdate.title'),
  block.paragraph('i18n.runtimeUpdate.description'),

  block.code(runtimeCodeExample),

  block.subtitle('i18n.useWithVueI18n.title'),
  block.paragraph('i18n.useWithVueI18n.description'),

  block.code(runtimeVueI18nCodeExample),
  block.collapse('i18n.useWithVueI18n.exampleConfig', [block.code(vueI18nExampleConfig)]),
]

export default config
