import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { componentsConfigCodeExample, componentsConfigCodeExampleDefaultSizes, componentsAllConfigCodeExample } from './code-examples'
import { api } from './sections'

const path = 'services/components-config'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('componentsConfig.title'),
  block.paragraph('componentsConfig.subtitle'),
  block.code(componentsConfigCodeExample),

  block.paragraph('componentsConfig.demoTitle'),
  block.example('button'),

  block.subtitle('componentsConfig.componentsAll.title'),
  block.paragraph('componentsConfig.componentsAll.subtitle'),
  block.code(componentsAllConfigCodeExample),
  block.paragraph('componentsConfig.componentsAll.description'),

  block.subtitle('componentsConfig.vaConfig.title'),
  block.paragraph('componentsConfig.vaConfig.subtitle'),
  block.example('va-config'),
  block.paragraph('componentsConfig.vaConfig.explain'),

  block.subtitle('componentsConfig.defaultSizes.title'),
  block.paragraph('componentsConfig.defaultSizes.description'),
  block.code(componentsConfigCodeExampleDefaultSizes),

  ...api,
]

export default config
