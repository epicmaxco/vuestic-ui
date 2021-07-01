import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { locale } from '../../../../helpers/I18nHelper'

export default [
  DocsHelper.title('ag-grid-wrapper.title'),
  DocsHelper.paragraph('ag-grid-wrapper.description'),
  DocsHelper.headline('ag-grid-wrapper.related'),
  DocsHelper.link('ag-grid-wrapper.styledTablesLink', `/${locale}/styles/table`),
] as ApiDocsBlock[]
