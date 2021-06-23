import { PropType } from 'vue'

export const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export const VaDatePickerCalendarProps = {
  monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
  weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
  firstWeekday: { type: String as PropType<'Monday' | 'Sunday'>, default: 'Sunday' },
}
