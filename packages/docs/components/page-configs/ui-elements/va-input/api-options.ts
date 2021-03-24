import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    autosize: { local: true },
    color: {},
    disabled: {},
    error: {},
    errorCount: {},
    errorMessages: {},
    label: {},
    mask: { local: true },
    maxRows: { local: true },
    messages: {},
    minRows: { local: true },
    placeholder: { local: true },
    readonly: {},
    removable: { local: true },
    returnRaw: { local: true },
    rules: {},
    success: {},
    tabindex: { local: true },
    type: { local: true },
    value: { local: true },
  },
  events: {
    input: {
      types: 'any',
    },
    change: {
      local: true,
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
    'click-prepend': {
      local: true,
      types: 'Event',
    },
    'click-prepend-inner': {
      local: true,
      types: 'Event',
    },
    'click-append': {
      local: true,
      types: 'Event',
    },
    'click-append-inner': {
      local: true,
      types: 'Event',
    },
    keyup: {
      local: true,
      types: 'Event',
    },
    keydown: {
      local: true,
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
