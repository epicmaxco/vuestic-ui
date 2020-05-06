import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaModalApiOptions: ManualApiOptions = {
  version: '1.3.0', // Not really, just for test.
  props: {
    position: {
      local: true,
    },
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
    'ok-text': {
      local: true,
    },
    'cancel-text': {
      local: true,
    },
    'hide-default-actions': {
      local: true,
    },
    fullscreen: {
      local: true,
    },
    'mobile-fullscreen': {
      local: true,
    },
    'no-dismiss': {
      local: true,
    },
    'no-outside-dismiss': {
      local: true,
    },
    'no-esc-dismiss': {
      local: true,
    },
    'max-width': {
      local: true,
    },
    'max-height': {
      local: true,
    },
    'fixed-layout': {
      local: true,
    },
    'without-transitions': {
      local: true,
    },
    overlay: {
      local: true,
    },
    'overlay-opacity': {
      local: true,
    },
    'z-index': {
      local: true,
    },
  },
  events: {
    'click-outside': {
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
}
