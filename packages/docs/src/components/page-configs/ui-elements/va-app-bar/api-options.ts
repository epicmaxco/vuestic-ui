import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

export default {
  props: {
    gradient: { local: true },
    bottom: { local: true },
    target: { local: false },
    hideOnScroll: { local: true },
    shadowOnScroll: { local: true },
    shadowColor: { local: true },
    color: { local: false },
  },
  events: {},
  methods: {},
  slots: {
    default: { local: true },
  },
} as ManualApiOptions
