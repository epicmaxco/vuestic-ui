// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    header: {
      local: true,
    },
    icon: {
      local: true,
    },
    solid: {
      local: true,
    },
    colorAll: {
      local: true,
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
      local: true,
    },
  },
  methods: {
  },
  slots: {
    default: {
      local: true,
    },
    header: {
      local: true,
    },
  },
} as ManualApiOptions
