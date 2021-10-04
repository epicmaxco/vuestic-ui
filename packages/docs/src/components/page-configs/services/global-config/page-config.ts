import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import {
  setupExampleCode,
  reactiveUpdateExampleCode,
  reactiveSetExampleCode,
  useInRuntimeCode,
} from './code-examples'
import { api } from './sections'

const config: ApiDocsBlock[] = [
  DocsHelper.title('globalConfig.title'),
  DocsHelper.paragraph('globalConfig.subtitle'),
  DocsHelper.paragraph('globalConfig.structure'),

  DocsHelper.paragraph('globalConfig.setupExampleTitle'),
  DocsHelper.code(setupExampleCode),

  DocsHelper.paragraph('globalConfig.reactiveUpdateExampleTitle'),
  DocsHelper.code(reactiveUpdateExampleCode),

  DocsHelper.paragraph('globalConfig.reactiveSetExampleTitle'),
  DocsHelper.code(reactiveSetExampleCode),

  DocsHelper.paragraph('globalConfig.useInRuntime'),
  DocsHelper.code(useInRuntimeCode),

  DocsHelper.headline('globalConfig.links.readMore'),
  DocsHelper.link('globalConfig.links.components', '/services/components-config'),
  DocsHelper.link('globalConfig.links.colors', '/services/colors-config'),
  DocsHelper.link('globalConfig.links.icons', '/services/icons-config'),

  ...api,
]

export default config
