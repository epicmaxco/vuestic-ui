import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
  },
  events: {
    input: {
      types: 'Boolean',
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
