import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { locale } from '../../../../helpers/I18nHelper'

export default [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),
  DocsHelper.headline('dataTable.related'),
  DocsHelper.link('dataTable.styledTablesLink', `/${locale}/styles/table`),
] as ApiDocsBlock[]
