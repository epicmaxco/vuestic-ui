import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    columns: {
      types: '`(string | ITableColumn)[]`',
    },
    filterMethod: {
      types: '`TFilterMethod: (source: any) => boolean`',
    },
    items: {
      types: '`ITableItem[]`',
    },
    selectMode: {
      types: '`TSelectMode: \'single\'|\'multiple\'`',
    },
    sortingOrder: {
      types: '`TSortingOrder: \'asc\'|\'desc\'|null`',
    },
  },
  events: {
    filtered: {
      types: '`() => Number`',
    },
    selectionChange: {
      types: '`() => Object`',
    },
    sorted: {
      types: '`() => Object`',
    },
    'update:sortBy': {
      types: '`() => String`',
    },
    'update:sortingOrder': {
      types: '`() => TSortingOrder`',
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
