import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDataTable from 'vuestic-ui/src/components/va-data-table/VaDataTable.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-data-table/_variables.scss')

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
  block.alert('dataTable.examples.slots.text[4]', 'warning'),
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

  block.headline('dataTable.examples.sorting.title'),
  block.paragraph('dataTable.examples.sorting.text[0]'),
  block.paragraph('dataTable.examples.sorting.text[1]'),
  block.paragraph('dataTable.examples.sorting.text[2]'),
  block.paragraph('dataTable.examples.sorting.text[3]'),
  block.example('Sorting'),

  block.headline('dataTable.examples.selection.title'),
  block.paragraph('dataTable.examples.selection.text[0]'),
  block.paragraph('dataTable.examples.selection.text[1]'),
  block.example('Selection'),
  block.paragraph('dataTable.examples.selection.text[2]'),
  block.example('SelectionWithKeys'),

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
  ...block.exampleBlock(
    'dataTable.examples.binding.title',
    'dataTable.examples.binding.text',
    'Binding',
  ),

  block.headline('dataTable.examples.sticky.title'),
  block.paragraph('dataTable.examples.sticky.text[0]'),
  block.paragraph('dataTable.examples.sticky.text[1]'),
  block.example('Sticky'),

  ...block.exampleBlock(
    'dataTable.examples.other.title',
    'dataTable.examples.other.text[0]',
    'Other',
  ),

  block.paragraph('dataTable.examples.other.text[1]'),
  block.example('CRUD'),

  block.subtitle('all.api'),
  block.api(VaDataTable, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
