import { PropType } from 'vue'

export const VaDatePickerCalendarProps = {
  monthNames: { type: Array as PropType<string[]>, required: true, default: [] },
  weekdayNames: { type: Array as PropType<string[]>, required: true, default: [] },
  firstWeekday: { type: String as PropType<'Monday' | 'Sunday'>, default: 'Sunday' },
  allowedDates: { type: Function as PropType<(date: Date) => boolean>, required: false },
  highlightTodayDate: { type: Boolean, default: true },
  highlightWeekends: { type: Boolean, default: false },
  weekends: { type: [Function] as PropType<(d: Date) => boolean>, default: undefined },
  hideWeekDays: { type: Boolean, default: false },
  year: { type: Number, required: true, default: () => new Date().getFullYear() },
  month: { type: Number, required: true, default: () => new Date().getMonth() },
}
