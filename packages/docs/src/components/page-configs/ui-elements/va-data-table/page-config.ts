import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaDataTable from 'vuestic-ui/src/components/va-data-table/VaDataTable.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('dataTable.title'),
  DocsHelper.paragraph('dataTable.description'),
  DocsHelper.paragraph('dataTable.otherTables.text'),
  DocsHelper.link('dataTable.otherTables.htmlTable', '/ui-elements/table'),
  DocsHelper.link('dataTable.otherTables.agGrid', '/extensions/ag-grid'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.default.title',
    'dataTable.examples.default.text',
    'va-data-table/Default',
  ),

  DocsHelper.headline('dataTable.examples.slots.title'),
  DocsHelper.paragraph('dataTable.examples.slots.text[0]'),
  DocsHelper.paragraph('dataTable.examples.slots.text[1]'),
  DocsHelper.example('va-data-table/CustomSlots'),
  DocsHelper.paragraph('dataTable.examples.slots.text[2]'),
  DocsHelper.example('va-data-table/StaticSlots'),
  DocsHelper.paragraph('dataTable.examples.slots.text[3]'),
  DocsHelper.example('va-data-table/ColgroupSlots'),

  ...DocsHelper.exampleBlock(
    'dataTable.examples.filtering.title',
    'dataTable.examples.filtering.text',
    'va-data-table/Filtering',
  ),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.sorting.title',
    'dataTable.examples.sorting.text',
    'va-data-table/Sorting',
  ),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.selection.title',
    'dataTable.examples.selection.text',
    'va-data-table/Selection',
  ),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.pagination.title',
    'dataTable.examples.pagination.text',
    'va-data-table/Pagination',
  ),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.alignment.title',
    'dataTable.examples.alignment.text',
    'va-data-table/Alignment',
  ),
  ...DocsHelper.exampleBlock(
    'dataTable.examples.other.title',
    'dataTable.examples.other.text',
    'va-data-table/Other',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDataTable, apiOptions),
]

export default config
