// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

export default {
  props: {
    ratio: {
      local: true,
    },
    contain: {
      local: true,
    },
  },
  events: {
    loaded: {
      local: true,
      types: 'Boolean',
    },
    error: {
      local: true,
      types: 'Boolean',
    },
  },
  slots: {
    loading: {
      local: true,
    },
    error: {
      local: true,
    },
    default: {
      local: true,
    },
  },
} as ManualApiOptions
