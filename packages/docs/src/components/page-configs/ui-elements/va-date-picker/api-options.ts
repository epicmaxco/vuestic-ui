import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    modelValue: { local: true, types: 'Date | Date[] | { start: Date | null, end: Date | null }' },
    monthNames: { local: true },
    weekdayNames: { local: true },
    firstWeekday: { local: true, types: "'Monday' | 'Sunday'" },
    hideWeekDays: { local: true },
    view: { local: true },
    showOtherMonths: { local: true },
    allowedDays: { local: true },
    allowedMonths: { local: true },
    allowedYears: { local: true },
    weekends: { local: true },
    highlightWeekend: { local: true },
    highlightToday: { local: true },
    startYear: { local: true },
    endYear: { local: true },
    mode: { local: true, types: "'single' | 'multiple' | 'range'" },
    type: { local: true },
    weekendsColor: { local: true },
  },
  events: {
  },
  methods: {
  },
  slots: {
  },
} as ManualApiOptions
