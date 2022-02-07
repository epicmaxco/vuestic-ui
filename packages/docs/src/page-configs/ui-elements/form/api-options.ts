import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  methods: {
    validate: {
      types: '`() => boolean`',
    },
    focus: {
      types: '`() => void`',
    },
    focusInvalid: {
      types: '`() => void`',
    },
    resetValidation: {
      types: '`() => boolean`',
    },
    reset: {
      types: '`() => boolean`',
    },
  },
  events: {
    validation: {
      types: '`(valid: boolean) => void`',
    },
  },
})
