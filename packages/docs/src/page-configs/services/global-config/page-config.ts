import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  setupExampleCode,
  reactiveUpdateExampleCode,
  reactiveSetExampleCode,
  useInRuntimeCode,
} from './code-examples'
import { api } from './sections'

const path = 'services/global-config'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('globalConfig.title'),
  block.paragraph('globalConfig.subtitle'),
  block.paragraph('globalConfig.structure'),

  block.paragraph('globalConfig.setupExampleTitle'),
  block.code(setupExampleCode),

  block.paragraph('globalConfig.reactiveUpdateExampleTitle'),
  block.code(reactiveUpdateExampleCode),

  block.paragraph('globalConfig.reactiveSetExampleTitle'),
  block.code(reactiveSetExampleCode),

  block.paragraph('globalConfig.useInRuntime'),
  block.code(useInRuntimeCode),

  block.headline('globalConfig.links.readMore'),
  block.link('globalConfig.links.components', '/services/components-config'),
  block.link('globalConfig.links.colors', '/services/colors-config'),
  block.link('globalConfig.links.icons', '/services/icons-config'),

  ...api,
]

export default config
