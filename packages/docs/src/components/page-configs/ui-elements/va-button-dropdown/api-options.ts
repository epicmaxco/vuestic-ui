import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    size: { local: true },
    value: { local: true },
    disableButton: { local: true },
    disableDropdown: { local: true },
    round: { local: true },
    split: { local: true },
    splitTo: { local: true },
    splitHref: { local: true },
    icon: { local: true },
    leftIcon: { local: true },
    openedIcon: { local: true },
    position: { local: true },
  },
  events: {
    click: { local: true, types: '`() => Event`' },
    mainButtonClick: { local: true, types: '`() => Event`' },
  },
  methods: {
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions
