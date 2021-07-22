import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),
  DocsHelper.headline('dataTable.related'),
  DocsHelper.link('dataTable.styledTablesLink', `/styles/table`),
] as ApiDocsBlock[]
