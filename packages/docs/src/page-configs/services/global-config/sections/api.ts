import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TableData, TableColumn } from '../../../../components/DocsTable/DocsTable'

export const columns: TableColumn[] = [
  'params',
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

export const tableData: TableData = [
  ['icons', 'IconsConfig', 'globalConfig.api.icons'],
  ['components', 'ComponentsConfig', 'globalConfig.api.components'],
  ['componentsAll', 'Props', 'globalConfig.api.componentsAll'],
  ['colors', 'ColorsConfig', 'globalConfig.api.colors'],
]

const block = new PageGenerationHelper(__dirname)

export const config: ApiDocsBlock[] = [
  block.subtitle('all.api'),
  block.table(columns, tableData),
]
