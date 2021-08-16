import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: '(value: array) => void',
    },
  },
  slots: {
    default: {},
  },
})
