import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { componentsConfigCodeExample } from './code-examples'
import { api } from './sections'

const config: ApiDocsBlock[] = [
  DocsHelper.title('componentsConfig.title'),
  DocsHelper.paragraph('componentsConfig.subtitle'),
  DocsHelper.code(componentsConfigCodeExample),

  DocsHelper.paragraph('componentsConfig.demoTitle'),
  DocsHelper.example('components-config/button'),

  DocsHelper.subtitle('componentsConfig.vaConfig.title'),
  DocsHelper.paragraph('componentsConfig.vaConfig.subtitle'),
  DocsHelper.example('components-config/va-config'),
  DocsHelper.paragraph('componentsConfig.vaConfig.explain'),

  ...api,
]

export default config
