// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

export default {
  props: {
    offsetTop: {
      local: true,
    },
    offsetBottom: {
      local: true,
    },
    target: {
      local: true,
    },
  },
  events: {
    change: {
      local: true,
      types: 'boolean',
    },
  },
} as ManualApiOptions
