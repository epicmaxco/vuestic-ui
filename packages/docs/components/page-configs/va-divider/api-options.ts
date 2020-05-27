import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    vertical: {
      local: true,
    },
    dashed: {
      local: true,
    },
    inset: {
      local: true,
    },
    orientation: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
