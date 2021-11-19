import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    load: { types: '() => Promise<any>' },
  },
  slots: {
    loading: { },
    default: { },
  },
})
