import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDataTable from 'vuestic-ui/src/components/va-data-table/VaDataTable.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('dataTable.title'),
  block.paragraph('dataTable.description'),
  block.paragraph('dataTable.otherTables.text'),
  block.link('dataTable.otherTables.htmlTable', '/ui-elements/table'),
  block.link('dataTable.otherTables.agGrid', '/extensions/ag-grid'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'dataTable.examples.default.title',
    'dataTable.examples.default.text',
    'Default',
  ),

  block.headline('dataTable.examples.slots.title'),
  block.paragraph('dataTable.examples.slots.text[0]'),
  block.paragraph('dataTable.examples.slots.text[1]'),
  block.example('CustomSlots'),
  block.paragraph('dataTable.examples.slots.text[2]'),
  block.example('StaticSlots'),
  block.paragraph('dataTable.examples.slots.text[3]'),
  block.example('ColgroupSlots'),

  ...block.exampleBlock(
    'dataTable.examples.filtering.title',
    'dataTable.examples.filtering.text',
    'Filtering',
  ),
  ...block.exampleBlock(
    'dataTable.examples.sorting.title',
    'dataTable.examples.sorting.text',
    'Sorting',
  ),
  ...block.exampleBlock(
    'dataTable.examples.selection.title',
    'dataTable.examples.selection.text',
    'Selection',
  ),
  ...block.exampleBlock(
    'dataTable.examples.pagination.title',
    'dataTable.examples.pagination.text',
    'Pagination',
  ),
  ...block.exampleBlock(
    'dataTable.examples.styling.title',
    'dataTable.examples.styling.text',
    'Styling',
  ),

  block.headline('dataTable.examples.stickyHeader.title'),
  block.paragraph('dataTable.examples.stickyHeader.text[0]'),
  block.paragraph('dataTable.examples.stickyHeader.text[1]'),
  block.example('StickyHeader'),

  ...block.exampleBlock(
    'dataTable.examples.other.title',
    'dataTable.examples.other.text[0]',
    'Other',
  ),

  block.paragraph('dataTable.examples.other.text[1]'),
  block.example('CRUD'),

  block.subtitle('all.api'),
  block.api(VaDataTable, apiOptions),
]

export default config
