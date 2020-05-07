import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaAffixOptions: ManualApiOptions = {
  version: '1.3.0', // Not really, just for test.
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
