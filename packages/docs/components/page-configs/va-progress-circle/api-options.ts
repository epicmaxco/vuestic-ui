import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    indeterminate: {
      local: true,
    },
    thickness: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
