// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

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
