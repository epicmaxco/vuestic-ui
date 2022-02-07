import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    blur: {
      types: 'FocusEvent',
    },
    focus: {
      types: 'FocusEvent',
    },
    input: {
      types: 'any',
    },
  },
  slots: {
    default: { },
    innerLabel: { },
  },
})
