import { computed, Ref, ref } from 'vue'

/** Returns last day of previous month */
export const getMonthDaysCount = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

export const getMonthStartWeekday = (year: number, month: number) => new Date(year, month, 1).getDay()

/** Returns array from 1 to length */
export const getNumbersArray = (length: number) => Array.from(Array(length).keys()).map((k) => k + 1)

export const useVaDatePickerCalendar = (currentYear: Ref<number>, currentMonth: Ref<number>, options?: { firstWeekday?: Ref<'Monday' | 'Sunday'> }) => {
  const CALENDAR_ROWS_COUNT = 6 // Need 6 rows if first day of a month is Saturday and the last day is Monday 31th.

  const localizeWeekday = (weekdayNumber: number) => {
    if (options && options.firstWeekday?.value === 'Monday') {
      // Set Sunday as 7th day of the week and Monday as first day of the week.
      return weekdayNumber === 0 ? 6 : weekdayNumber - 1
    }

    return weekdayNumber
  }

  const getPreviousDates = () => {
    const currentMonthStartWeekday = localizeWeekday(getMonthStartWeekday(currentYear.value, currentMonth.value))

    if (currentMonthStartWeekday === 0) { return [] }

    const prevMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value - 1)
    const prevMonthDays: number[] = getNumbersArray(prevMonthDaysCount)

    return prevMonthDays
      .slice(-currentMonthStartWeekday)
      .map((d) => new Date(currentYear.value, currentMonth.value - 1, d))
  }

  const getCurrentDates = () => {
    const currentMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value)
    const currentMonthDays: number[] = getNumbersArray(currentMonthDaysCount)

    return currentMonthDays.map((d) => new Date(currentYear.value, currentMonth.value, d))
  }

  const calendarDates = computed(() => {
    const days = [
      ...getPreviousDates(),
      ...getCurrentDates(),
    ]

    const daysRemaining = 7 * CALENDAR_ROWS_COUNT - days.length

    const nextMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value + 1)
    const nextMonthDays: number[] = getNumbersArray(nextMonthDaysCount)

    return [
      ...days,
      ...nextMonthDays
        .slice(0, daysRemaining)
        .map((d) => new Date(currentYear.value, currentMonth.value + 1, d)),
    ]
  })

  return {
    currentYear, currentMonth, calendarDates,
  }
}
