import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    columns: {
      types: '`(string | DataTableColumn)[]`',
    },
    filterMethod: {
      types: '`DataTableFilterMethod: (source: any) => boolean`',
    },
    items: {
      types: '`DataTableItem[]`',
    },
    selectMode: {
      types: '`DataTableSelectMode: \'single\'|\'multiple\'`',
    },
    sortingOrder: {
      types: '`DataTableSortingOrder: \'asc\'|\'desc\'|null`',
    },
    sortingOptions: {
      types: '`DataTableSortingOrder[]`',
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
      types: '`() => DataTableSortingOrder`',
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
    'scroll:bottom': {
      types: '`() => Event`',
    },
    'scroll:top': {
      types: '`() => Event`',
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
