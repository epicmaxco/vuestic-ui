import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    click: {
      types: 'Event',
      isDOMEvent: true,
    },
  },
  methods: {
  },
  slots: {
    default: { },
  },
})
