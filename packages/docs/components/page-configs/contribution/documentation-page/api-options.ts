import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
      hidden: false,
      types: '',
      version: '0',
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
      local: true,
      version: '0',
    },
  },
  methods: {
    hide: {
      types: '() => void',
      local: true,
      version: '0',
    },
  },
  slots: {
    default: {
      local: true,
      version: '0',
    },
  },
} as ManualApiOptions
