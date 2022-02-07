import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    loaded: {
      types: 'Boolean',
    },
    error: {
      types: 'Boolean',
    },
  },
  slots: {
    loading: { },
    error: { },
    default: { },
  },
})
