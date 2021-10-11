import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
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
