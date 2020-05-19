import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaBreadcrumbsItemApiOptions: ManualApiOptions = {
  props: {
    label: {
      local: true,
    },
    to: {
      local: true,
    },
    replace: {
      local: true,
    },
    append: {
      local: true,
    },
    exact: {
      local: true,
    },
    href: {
      hidden: true,
    },
    exactActiveClass: {
      hidden: true,
    },
    activeClass: {
      hidden: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
  },
}
