import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaAffixOptions: ManualApiOptions = {
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
}
