import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: { types: '`(value: String | Object) => void`' },
  },
  slots: {
    default: { },
  },
})
