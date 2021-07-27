import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    clickOutside: {
      types: '() => void',
    },
    input: {
      types: '(value: boolean) => void',
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
    open: {
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
  },
})
