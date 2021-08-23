import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('ag-grid-wrapper.title'),
  DocsHelper.paragraph('ag-grid-wrapper.description'),
  DocsHelper.headline('ag-grid-wrapper.related'),
  DocsHelper.link('ag-grid-wrapper.styledTablesLink', '/styles/table'),
] as ApiDocsBlock[]
