import { computed, Ref } from 'vue'
import { VaDatePickerView } from '../../types'

/** Returns last day of previous month */
export const getMonthDaysCount = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

export const getMonthStartWeekday = (year: number, month: number) => new Date(year, month, 1).getDay()

/** Returns array from 1 to length */
export const getNumbersArray = (length: number) => Array.from(Array(length).keys()).map((k) => k + 1)

export const useVaDatePickerCalendar = (view: Ref<VaDatePickerView>, options?: { firstWeekday?: Ref<'Monday' | 'Sunday'> }) => {
  const CALENDAR_ROWS_COUNT = 6 // Need 6 rows if first day of a month is Saturday and the last day is Monday 31th.

  const localizeWeekday = (weekdayNumber: number) => {
    if (options && options.firstWeekday?.value === 'Monday') {
      // Set Sunday as 7th day of the week and Monday as first day of the week.
      return weekdayNumber === 0 ? 6 : weekdayNumber - 1
    }

    return weekdayNumber
  }

  const currentMonthStartWeekday = computed(() => localizeWeekday(getMonthStartWeekday(view.value.year, view.value.month)))

  const getPreviousDates = () => {
    if (currentMonthStartWeekday.value === 0) { return [] }

    const prevMonthDaysCount = getMonthDaysCount(view.value.year, view.value.month - 1)
    const prevMonthDays: number[] = getNumbersArray(prevMonthDaysCount)

    return prevMonthDays
      .slice(-currentMonthStartWeekday.value)
      .map((d) => new Date(view.value.year, view.value.month - 1, d))
  }

  const getCurrentDates = () => {
    const currentMonthDays: number[] = getNumbersArray(getMonthDaysCount(view.value.year, view.value.month))

    return currentMonthDays.map((d) => new Date(view.value.year, view.value.month, d))
  }

  const prevAndCurrentDays = computed(() => [...getPreviousDates(), ...getCurrentDates()])
  const currentMonthEndIndex = computed(() => prevAndCurrentDays.value.length)

  const calendarDates = computed(() => {
    const days = prevAndCurrentDays.value

    const daysRemaining = 7 * CALENDAR_ROWS_COUNT - days.length

    const nextMonthDaysCount = getMonthDaysCount(view.value.year, view.value.month + 1)
    const nextMonthDays: number[] = getNumbersArray(nextMonthDaysCount)

    return [
      ...days,
      ...nextMonthDays
        .slice(0, daysRemaining)
        .map((d) => new Date(view.value.year, view.value.month + 1, d)),
    ]
  })

  return { calendarDates, currentMonthStartIndex: currentMonthStartWeekday, currentMonthEndIndex }
}
