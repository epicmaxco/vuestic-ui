import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    'click:next': {
      types: '`() => void`',
    },
    'click:prev': {
      types: '`() => void`',
    },
    'update:model-value': {
      types: '`() => number | string`',
    },
  },
  slots: {
    default: { },
    tabs: { },
  },
})
