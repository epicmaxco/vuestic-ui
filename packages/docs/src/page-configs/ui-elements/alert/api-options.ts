import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  methods: {
    hide: {
      types: '() => void',
    },
  },
  slots: {
    default: { },
    title: { },
    icon: { },
    close: { },
  },
})
