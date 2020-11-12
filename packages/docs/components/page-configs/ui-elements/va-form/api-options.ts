import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    autofocus: {
      local: true,
    },
  },
  methods: {
    validate: {
      local: true,
      types: '`() => boolean`',
    },
    focus: {
      local: true,
      types: '`() => void`',
    },
    focusInvalid: {
      local: true,
      types: '`() => void`',
    },
    resetValidation: {
      local: true,
      types: '`() => boolean`',
    },
    reset: {
      local: true,
      types: '`() => boolean`',
    },
  },
  events: {
    validation: {
      types: '`(valid: boolean) => void`',
    },
  },
} as ManualApiOptions
