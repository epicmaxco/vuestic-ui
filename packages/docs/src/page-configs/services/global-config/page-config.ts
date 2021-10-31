import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  setupExampleCode,
  reactiveUpdateExampleCode,
  reactiveSetExampleCode,
  useInRuntimeCode,
} from './code-examples'
import { TableColumn, TableData } from '../../../components/DocsTable/DocsTable'

const columns: TableColumn[] = [
  'params',
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  ['icons', 'IconsConfig', 'globalConfig.api.icons'],
  ['components', 'ComponentsConfig', 'globalConfig.api.components'],
  ['componentsAll', 'Props', 'globalConfig.api.componentsAll'],
  ['colors', 'ColorsConfig', 'globalConfig.api.colors'],
]

const block = new PageGenerationHelper(__dirname)

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

  // api
  block.subtitle('all.api'),
  block.table(columns, tableData),
]

export default config
