import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: '(value: boolean) => void',
    },
  },
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
