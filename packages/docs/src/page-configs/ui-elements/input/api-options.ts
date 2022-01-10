import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    change: {
      types: 'any',
    },
    blur: {
      types: 'FocusEvent',
    },
    focus: {
      types: 'FocusEvent',
    },
    click: {
      types: 'Event',
    },
    clickIcon: {
      types: 'Event',
    },
    clickPrepend: {
      types: 'Event',
    },
    clickPrependInner: {
      types: 'Event',
    },
    clickAppend: {
      types: 'Event',
    },
    clickAppendInner: {
      types: 'Event',
    },
    keyup: {
      types: 'Event',
    },
    keydown: {
      types: 'Event',
    },
  },
  methods: {
    focus: {
      types: '() => void',
    },
    blur: {
      types: '() => void',
    },
    reset: {
      types: '() => void',
    },
  },
  slots: {
    prepend: { },
    prependInner: { },
    append: { },
    appendInner: { },
  },
})
