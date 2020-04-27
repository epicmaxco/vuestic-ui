import { ManualApiOptions } from '../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaFormApiOptions: ManualApiOptions = {
  version: '1.3.0', // Not really, just for test.
  props: {
    autofocus: {
      local: true,
      version: '1.3.1', // Not really, just for test.
    },
  },
  methods: {
    'validate': {
      types: '`() => boolean`',
    },
    'focus': {
      types: '`() => void`',
    },
    'focusInvalid': {
      types: '`() => void`',
    },
    'resetValidation': {
      types: '`() => boolean`',
    },
    'reset': {
      types: '`() => boolean`',
    },
  },
  events: {
    validation: {
      types: '`(valid: boolean) => void`',
    },
  },
}
