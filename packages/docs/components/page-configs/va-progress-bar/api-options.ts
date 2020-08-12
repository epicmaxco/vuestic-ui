import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    indeterminate: {
      local: true,
    },
    buffer: {
      local: true,
    },
    reverse: {
      local: true,
    },
    rounded: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
