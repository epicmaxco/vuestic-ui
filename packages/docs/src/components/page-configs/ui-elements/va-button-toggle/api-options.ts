// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    activeButtonTextColor: { local: true },
    options: { local: true },
    value: { local: true },
    size: { local: true },
    toggleColor: { local: true },
  },
  events: {
    input: {
      types: '(value: any) => void',
      local: true,
    },
  },
  methods: {
  },
  slots: {
  },
} as ManualApiOptions
