import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    activeColor: {
      local: true,
    },
    separator: {
      local: true,
    },
    separatorColor: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
    separator: {
      local: true,
    },
  },
} as ManualApiOptions
