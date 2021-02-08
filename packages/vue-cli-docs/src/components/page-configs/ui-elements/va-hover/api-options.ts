// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

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
