import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    target: { local: true },
    visibilityHeight: { local: true },
    speed: { local: true },
    top: { local: true },
    right: { local: true },
    bottom: { local: true },
    left: { local: true },
  },
  events: {
    click: {
      types: 'Event',
      local: true,
    },
  },
  methods: {
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions
