import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    columns: {
      types: '`(string | VaDataTableColumn)[]`',
    },
    filterMethod: {
      types: '`VaDataTableFilterMethod: (source: any) => boolean`',
    },
    items: {
      types: '`VaDataTableItem[]`',
    },
    selectMode: {
      types: '`VaDataTableSelectMode: \'single\'|\'multiple\'`',
    },
    sortingOrder: {
      types: '`VaDataTableSortingOrder: \'asc\'|\'desc\'|null`',
    },
  },
  events: {
    filtered: {
      types: '`() => FilteredEmit`',
    },
    selectionChange: {
      types: '`() => SelectionChangeEmit`',
    },
    sorted: {
      types: '`() => SortedEmit`',
    },
    'update:sortBy': {
      types: '`() => String`',
    },
    'update:sortingOrder': {
      types: '`() => VaDataTableSortingOrder`',
    },
    'row:click': {
      types: '`() => RowClickEmit`',
    },
    'row:contextmenu': {
      types: '`() => RowClickEmit`',
    },
    'row:dblclick': {
      types: '`() => RowClickEmit`',
    },
  },
  slots: {
    colgroup: {},
    headerPrepend: {},
    header: {},
    'header(key)': {},
    headerAppend: {},
    bodyPrepend: {},
    cell: {},
    'cell(key)': {},
    bodyAppend: {},
    footerPrepend: {},
    footer: {},
    'footer(key)': {},
    footerAppend: {},
  },
})
