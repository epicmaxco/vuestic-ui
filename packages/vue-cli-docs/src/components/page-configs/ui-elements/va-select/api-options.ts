// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    options: { local: true },
    disabledBy: { local: true },
    valueBy: { local: true },
    trackBy: { local: true },
    textBy: { local: true },
    placeholder: { local: true },
    position: { local: true },
    tagMax: { local: true },
    tags: { local: true },
    deletableTags: { local: true },
    searchable: { local: true },
    multiple: { local: true },
    width: { local: true },
    maxHeight: { local: true },
    noOptionsText: { local: true },
    fixed: { local: true },
    clearable: { local: true },
    hideSelected: { local: true },
    allowCreate: { local: true },
    clearIcon: { local: true },
    dropdownIcon: { local: true },
  },
  events: {
    input: {
      types: 'any',
    },
    clear: {
      types: 'any',
      local: true,
    },
    updateSearch: {
      types: 'any',
      local: true,
    },
  },
  methods: {
    reset: {
      types: '() => void',
      local: true,
    },
  },
  slots: {
    prepend: {
      local: true,
    },
    prependInner: {
      local: true,
    },
    append: {
      local: true,
    },
    appendInner: {
      local: true,
    },
  },
} as ManualApiOptions
