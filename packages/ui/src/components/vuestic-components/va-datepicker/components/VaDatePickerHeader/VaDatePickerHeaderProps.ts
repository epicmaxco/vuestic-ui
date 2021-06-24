import { PropType } from 'vue'
import { VaDatePickerView } from '../../types/types'

export const VaDatePickerHeaderProps = {
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  monthNames: { type: Array, required: true },
  view: { type: String as PropType<VaDatePickerView>, required: true },
}
