import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    outline: { local: true },
    flat: { local: true },
    icon: { local: true },
    iconRight: { local: true },
    type: { local: true },
    loading: { local: true },
    block: { local: true },
    round: { local: true },
    href: { local: true },
    targer: { local: true },
  },
  slots: {
    default: { local: true },
  },
  events: {
    click: { local: true, types: '`() => Event`' },
  },
} as ManualApiOptions
