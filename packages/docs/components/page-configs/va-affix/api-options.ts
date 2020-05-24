import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    offsetTop: {
      local: true,
    },
    offsetBottom: {
      local: true,
    },
    target: {
      local: true,
    },
  },
  events: {
    change: {
      local: true,
      types: 'boolean',
    },
  },
} as ManualApiOptions
