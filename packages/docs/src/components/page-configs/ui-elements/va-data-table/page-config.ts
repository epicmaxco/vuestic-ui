import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),
  DocsHelper.headline('dataTable.related'),
  DocsHelper.paragraph('dataTable.otherTables.text'),
  DocsHelper.link('dataTable.otherTables.htmlTable', '/styles/table'),
  DocsHelper.link('dataTable.otherTables.agGrid', '/extensions/ag-grid'),
]

export default config
