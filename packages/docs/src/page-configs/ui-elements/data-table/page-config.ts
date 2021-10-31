import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const path = 'ui-elements/data-table'
const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('dataTable.title'),
  block.paragraph('dataTable.description'),
  block.headline('dataTable.related'),
  block.link('dataTable.styledTablesLink', '/styles/table'),
]

export default config
