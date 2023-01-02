import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  slots: {
    default: { },
  },

  events: {
    error: {
      types: 'Error',
    },
  },
})
