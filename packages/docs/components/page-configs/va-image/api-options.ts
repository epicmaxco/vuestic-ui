import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    ratio: {
      local: true,
    },
    contain: {
      local: true,
    },
  },
  events: {
    loaded: {
      local: true,
      types: 'Boolean',
    },
    error: {
      local: true,
      types: 'Boolean',
    },
  },
  slots: {
    loading: {
      local: true,
    },
    error: {
      local: true,
    },
    default: {
      local: true,
    },
  },
} as ManualApiOptions
