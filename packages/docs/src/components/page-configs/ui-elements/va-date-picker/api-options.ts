import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    modelValue: { types: 'Date | Date[] | { start: Date | null, end: Date | null }' },
    firstWeekday: { types: "'Monday' | 'Sunday'" },
    mode: { types: "'single' | 'multiple' | 'range'" },
  },
})
