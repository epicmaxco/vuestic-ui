import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    icon: {
      local: true,
    },
    src: {
      local: true,
    },
    fontSize: {
      local: true,
    },
    email: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
