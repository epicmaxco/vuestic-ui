// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: {
      local: true,
    },
    title: {
      local: true,
    },
    message: {
      local: true,
    },
    size: {
      local: true,
    },
    okText: {
      local: true,
    },
    cancelText: {
      local: true,
    },
    hideDefaultActions: {
      local: true,
    },
    fullscreen: {
      local: true,
    },
    mobileFullscreen: {
      local: true,
    },
    noDismiss: {
      local: true,
    },
    noOutsideDismiss: {
      local: true,
    },
    noEscDismiss: {
      local: true,
    },
    maxWidth: {
      local: true,
    },
    maxHeight: {
      local: true,
    },
    fixedLayout: {
      local: true,
    },
    withoutTransitions: {
      local: true,
    },
    overlay: {
      local: true,
    },
    overlayOpacity: {
      local: true,
    },
    zIndex: {
      local: true,
    },
  },
  events: {
    clickOutside: {
      types: '() => void',
      local: true,
    },
    input: {
      types: '(value: boolean) => void',
      local: true,
    },
    ok: {
      types: '() => void',
      local: true,
    },
    cancel: {
      types: '() => void',
      local: true,
    },
    beforeOpen: {
      types: '() => HTMLElement',
      local: true,
    },
    open: {
      types: '() => HTMLElement',
      local: true,
    },
    beforeClose: {
      types: '() => HTMLElement',
      local: true,
    },
    close: {
      types: '() => HTMLElement',
      local: true,
    },
  },
  methods: {
    hide: {
      types: '() => void',
      local: true,
    },
    open: {
      types: '() => void',
      local: true,
    },
    toggle: {
      types: '() => void',
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
    header: {
      local: true,
    },
    footer: {
      local: true,
    },
  },
} as ManualApiOptions
