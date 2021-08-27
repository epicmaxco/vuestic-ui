import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),
  DocsHelper.headline('dataTable.related'),
  DocsHelper.link('dataTable.styledTablesLink', '/styles/table'),
]

export default config
