import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TableData, TableColumn } from '../../../../components/DocsTable/DocsTable'

const columns: TableColumn[] = [
  'Name',
  { title: 'Type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  [
    'ComponentsConfig',
    '{ [componentName: string]: Props }',
    'componentsConfig.api.ComponentConfig',
  ],
  [
    'Props',
    '{ [propName: string]: any }',
    'componentsConfig.api.ComponentsAllConfig',
  ],
]

const path = 'services/components-config'
const block = new PageGenerationHelper(__dirname)

export const config: ApiDocsBlock[] = [
  block.subtitle('componentsConfig.api.title'),
  block.headline('componentsConfig.api.types'),
  block.table(columns, tableData),
]
