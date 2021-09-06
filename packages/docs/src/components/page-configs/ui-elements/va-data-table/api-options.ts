import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    filter: {
      types: '`() => Number`',
    },
    selectionChange: {
      types: '`() => Object`',
    },
    sort: {
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
    headPrepend: {},
    head: {},
    'head(key)': {},
    headAppend: {},
    bodyPrepend: {},
    cell: {},
    'cell(key)': {},
    bodyAppend: {},
    footPrepend: {},
    foot: {},
    'foot(key)': {},
    footAppend: {},
  },
})
