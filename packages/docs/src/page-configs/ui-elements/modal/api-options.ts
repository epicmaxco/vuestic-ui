import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    clickOutside: {
      types: '() => void',
    },
    ok: {
      types: '() => void',
    },
    cancel: {
      types: '() => void',
    },
    beforeOpen: {
      types: '() => HTMLElement',
    },
    open: {
      types: '() => HTMLElement',
    },
    beforeClose: {
      types: '() => HTMLElement',
    },
    close: {
      types: '() => HTMLElement',
    },
  },
  methods: {
    hide: {
      types: '() => void',
    },
    show: {
      types: '() => void',
    },
    toggle: {
      types: '() => void',
    },
  },
  slots: {
    default: { },
    header: { },
    footer: { },
    anchor: { },
  },
})
