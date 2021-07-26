// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

export default {
  props: {
    activeColor: {
      local: true,
    },
    separator: {
      local: true,
    },
    separatorColor: {
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
    separator: {
      local: true,
    },
  },
} as ManualApiOptions
