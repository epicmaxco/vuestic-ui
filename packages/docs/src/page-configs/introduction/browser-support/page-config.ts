import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TableData, TableColumn } from '../../../components/DocsTable/DocsTableTypes'

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

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('browserSupport.title'),
  block.paragraph('browserSupport.description'),
  block.table(columns, tableData),
]

export default config
