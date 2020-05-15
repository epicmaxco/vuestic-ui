import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaFormApiOptions: ManualApiOptions = {
  props: {
    autofocus: {
      local: true,
    },
  },
  methods: {
    validate: {
      types: '`() => boolean`',
    },
    focus: {
      types: '`() => void`',
    },
    focusInvalid: {
      types: '`() => void`',
    },
    resetValidation: {
      types: '`() => boolean`',
    },
    reset: {
      types: '`() => boolean`',
    },
  },
  events: {
    validation: {
      types: '`(valid: boolean) => void`',
    },
  },
}
