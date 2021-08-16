import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    modelValue: { types: 'Date | Date[] | { start: Date | null, end: Date | null }' },
    firstWeekday: { types: "'Monday' | 'Sunday'" },
    mode: { types: "'single' | 'multiple' | 'range'" },
  },
  events: {
    'update:view': {
      types: '`() => Object`',
    },
    'hover:year': {
      types: '`() => Date | undefined`',
    },
    'click:year': {
      types: '`() => Date`',
    },
    'hover:month': {
      types: '`() => Date | undefined`',
    },
    'click:month': {
      types: '`() => Date`',
    },
    'hover:day': {
      types: '`() => Date | undefined`',
    },
    'click:day': {
      types: '`() => Date`',
    },
  },
  slots: {
    buttonPrev: {},
    buttonNext: {},
    header: {},
    year: {},
    month: {},
    weekday: {},
    day: {},
  },
})
