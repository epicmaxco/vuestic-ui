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
    description: {
      local: true,
    },
    icon: {
      local: true,
    },
    closeIcon: {
      local: true,
    },
    closeText: {
      local: true,
    },
    closeable: {
      local: true,
    },
    center: {
      local: true,
    },
    borderColor: {
      local: true,
    },
    border: {
      local: true,
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
    },
  },
  methods: {
    hide: {
      types: '() => void',
      local: true,
    },
  },
  slots: {
    default: {
      local: true,
    },
    title: {
      local: true,
    },
    icon: {
      local: true,
    },
    close: {
      local: true,
    },
  },
} as ManualApiOptions
