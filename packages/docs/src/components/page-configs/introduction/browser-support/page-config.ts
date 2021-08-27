import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { TableData, TableColumn } from '../../../../components/DocsTable/DocsTable'

const columns: TableColumn[] = [
  'browserSupport.table.browser',
  'browserSupport.table.supported',
]

const tableData: TableData = [
  // TODO Figure exact versions we support. Show on hover.
  ['Chromium (Chrome, Edge)', '+'],
  ['Firefox', '+'],
  ['Safari (10+)', '+'],
  ['IE11/Safari 9', '-'],
]

const config: ApiDocsBlock[] = [
  DocsHelper.title('browserSupport.title'),
  DocsHelper.paragraph('browserSupport.description'),
  DocsHelper.table(columns, tableData),
]

export default config
