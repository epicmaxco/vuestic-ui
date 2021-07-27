import { defineManualApi } from '../../../DocsApi/ManualApiOptions'
import InputApiOptions from '../va-input/api-options'

export default defineManualApi({
  props: {
    modelValue: { types: 'Date | Date[] | { start: Date | null, end: Date | null }' },
    firstWeekday: { types: "'Monday' | 'Sunday'" },
    mode: { types: "'single' | 'multiple' | 'range'" },

    ...InputApiOptions.props,
  },
})
