import { PropType } from 'vue'
import { VaDatePickerView } from '../../types/types'

export const VaDatePickerHeaderProps = {
  // Use default here to make year and month not undefined type
  year: { type: Number, required: true, default: () => 0 },
  month: { type: Number, required: true, default: () => 0 },
  monthNames: { type: Array, required: true },
  view: { type: String as PropType<VaDatePickerView>, required: true },
}
