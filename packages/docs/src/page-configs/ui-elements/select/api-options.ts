import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    clear: {
      types: 'any',
    },
    updateSearch: {
      types: 'any',
    },
    scrollBottom: {
      types: 'any',
    },
  },
  methods: {
    reset: {
      types: '() => void',
    },
  },
  slots: {
    prepend: { },
    prependInner: { },
    append: { },
    appendInner: { },
    content: { },
    option: { },
    hiddenOptionsBadge: { },
    hideOptionsButton: { },
  },
})
