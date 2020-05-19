import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    left: { local: true },
    right: { local: true },
    center: { local: true },
    grow: { local: true },
    hideSlider: { local: true },
    vertical: { local: true },
    prevIcon: { local: true },
    nextIcon: { local: true },
  },
  events: {
    input: {
      types: '`(value: number | string) => void`',
    },
  },
} as ManualApiOptions
