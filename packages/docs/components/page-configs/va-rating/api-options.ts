import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    icon: {
      local: true,
    },
    halfIcon: {
      local: true,
    },
    emptyIcon: {
      local: true,
    },
    readonly: {
      local: true,
    },
    numbers: {
      local: true,
    },
    halves: {
      local: true,
    },
    max: {
      local: true,
    },
    clearable: {
      local: true,
    },
    hover: {
      local: true,
    },
    texts: {
      local: true,
    },
    textColor: {
      local: true,
    },
    unselectedColor: {
      local: true,
    },
  },
  events: {
    input: {
      types: '`(value: number) => void`',
    },
  },
} as ManualApiOptions
