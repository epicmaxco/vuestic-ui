import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  version: '1.1',
  props: {
    value: {
      local: true,
      hidden: false,
      types: 'String',
      version: '1.0',
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
      local: true,
      version: '1.0',
    },
  },
  methods: {
    hide: {
      types: '() => void',
      local: true,
      version: '1.0',
    },
  },
  slots: {
    default: {
      local: true,
      version: '1.0',
    },
  },
} as ManualApiOptions
