// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    multiply: {
      local: true,
    },
    inset: {
      local: true,
    },
    popout: {
      local: true,
    },
  },
  events: {
    input: {
      types: '(value: array) => void',
      local: true,
    },
  },
  methods: {
  },
  slots: {
    default: {
      local: true,
    },
  },
} as ManualApiOptions
