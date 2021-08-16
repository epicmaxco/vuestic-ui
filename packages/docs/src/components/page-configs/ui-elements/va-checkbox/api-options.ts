import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: '(event: Event) => void',
    },
  },
})
