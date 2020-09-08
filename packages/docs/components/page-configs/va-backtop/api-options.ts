import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    target: { local: true },
    visibilityHeight: { local: true },
    speed: { local: true },
    verticalPosition: { local: true },
    horizontalPosition: { local: true },
    verticalOffset: { local: true },
    horizontalOffset: { local: true },
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
