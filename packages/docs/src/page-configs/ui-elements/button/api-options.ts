import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  slots: {
    default: { },
  },
  events: {
    click: { types: '`() => Event`', isDOMEvent: true },
  },
  methods: {
    focus: { types: '`() => void`' },
    blur: { types: '`() => void`' },
  },
})
