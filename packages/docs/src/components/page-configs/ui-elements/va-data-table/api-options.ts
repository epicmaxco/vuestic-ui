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
