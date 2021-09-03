import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaDataTable from 'vuestic-ui/src/components/wip-va-data-table/VaDataTable.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),

  DocsHelper.headline('dataTable.related'),
  DocsHelper.link('dataTable.styledTablesLink', '/styles/table'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDataTable, apiOptions),
]

export default config
