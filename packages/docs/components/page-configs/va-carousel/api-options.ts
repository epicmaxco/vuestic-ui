import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    autoplay: { local: true },
    autoplayInterval: { local: true },
    autoplayDirection: { local: true },
    value: { local: true },
    loop: { local: true },
    draggable: { local: true },
    navigation: { local: true },
    pagination: { local: true },
    width: { local: true },
    height: { local: true },
    paginationPosition: { local: true },
  },
  events: {
  },
  methods: {
  },
  slots: {
    default: { local: true },
    content: { local: true },
    navigation: { local: true },
    pagination: { local: true },
  },
} as ManualApiOptions
