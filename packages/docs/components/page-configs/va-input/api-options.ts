import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    type: { local: true },
    label: { local: true },
    placeholder: { local: true },
    mask: { local: true },
    color: { local: true },
    removable: { local: true },
    tabindex: { local: true },
    returnRaw: { local: true },
    autosize: { local: true },
    minRows: { local: true },
    maxRows: { local: true },
    rules: { local: true },
    disabled: { local: true },
    readonly: { local: true },
    success: { local: true },
    messages: { local: true },
    error: { local: true },
    errorMessages: { local: true },
    errorCount: { local: true },
  },
  events: {
    input: {
      types: 'any',
    },
    change: {
      types: 'any',
    },
    blur: {
      types: 'FocusEvent',
    },
    focus: {
      types: 'FocusEvent',
    },
    click: {
      types: 'Event',
    },
    keyup: {
      types: 'Event',
    },
    keydown: {
      types: 'Event',
    },
  },
  methods: {
    focus: {
      types: '() => void',
      local: true,
    },
    reset: {
      types: '() => void',
      local: true,
    },
  },
  slots: {
    prepend: { local: true },
    prependInner: { local: true },
    append: { local: true },
    appendInner: { local: true },
  },
} as ManualApiOptions
