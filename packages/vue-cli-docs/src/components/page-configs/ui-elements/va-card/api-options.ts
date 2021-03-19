// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    stripe: {
      local: true,
    },
    stripeColor: {
      local: true,
    },
    gradient: {
      local: true,
    },
    bordered: {
      local: true,
    },
    outlined: {
      local: true,
    },
  },
  events: {
    click: {
      types: 'Event',
    },
  },
} as ManualApiOptions
