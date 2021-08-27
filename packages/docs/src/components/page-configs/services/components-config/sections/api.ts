import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { TableData, TableColumn } from '../../../../../components/DocsTable/DocsTable'

const columns: TableColumn[] = [
  'Name',
  { title: 'Type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  [
    'ComponentConfig',
    'Record<[componentName: string], Record<[componentProp: string], any>>',
    'componentsConfig.api.ComponentConfig',
  ],
]

export const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('componentsConfig.api.title'),
  DocsHelper.headline('componentsConfig.api.types'),
  DocsHelper.table(columns, tableData),
]
