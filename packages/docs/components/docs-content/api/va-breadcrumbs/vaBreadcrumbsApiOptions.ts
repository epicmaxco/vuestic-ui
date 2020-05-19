import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaBreadcrumbsApiOptions: ManualApiOptions = {
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
}
