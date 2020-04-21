import { ApiOptions } from '../../docs/utilities/ApiOptions'

export const VaFormApi: ApiOptions = {
  version: '1.0.0',
  props: {
    autofocus: {
      local: true,
      version: '1.0.1' // Not really, just for test.
    }
  },
  methods: {
    'validate': '() => boolean',
    'focus': '() => void',
    'focusInvalid': '() => void',
    'resetValidation': '() => boolean',
    'reset': '() => boolean',
  },
  events: {
    'validation': '(valid: boolean) => void',
  },
}
