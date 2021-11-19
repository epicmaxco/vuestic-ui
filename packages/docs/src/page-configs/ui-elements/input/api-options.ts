import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: 'any',
    },
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
    'click-prepend': {
      types: 'Event',
    },
    'click-prepend-inner': {
      types: 'Event',
    },
    'click-append': {
      types: 'Event',
    },
    'click-append-inner': {
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
