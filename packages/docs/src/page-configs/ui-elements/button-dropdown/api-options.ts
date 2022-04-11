import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    click: { types: '`() => Event`' },
    mainButtonClick: { types: '`() => Event`' },
  },
  slots: {
    default: { },
    label: { },
  },
})
