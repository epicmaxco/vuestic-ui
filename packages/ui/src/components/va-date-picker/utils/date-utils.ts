import { DatePickerModelValue, DatePickerRange } from '../types'
import { DateInputModelValue } from '../../va-date-input/types'
import isDate from 'lodash/isDate.js'

export const isDatesDayEqual = (date1?: Date | null, date2?: Date | null): boolean => date1?.toDateString() === date2?.toDateString()

export const isDatesYearEqual = (date1?: Date | null, date2?: Date | null): boolean => {
  return date1?.getFullYear() === date2?.getFullYear()
}

export const isDatesMonthEqual = (date1?: Date | null, date2?: Date | null): boolean => {
  return isDatesYearEqual(date1, date2) && date1?.getMonth() === date2?.getMonth()
}

export const createYearDate = (year: number) => {
  const date = new Date()
  date.setFullYear(year)
  return date
}

export const isDatesArrayIncludeDay = (dates: Date[], date: Date): boolean => {
  return !!dates.find((d) => isDatesDayEqual(d, date))
}

export const isDatesArrayIncludeMonth = (dates: Date[], date: Date): boolean => {
  return !!dates.find((d) => isDatesMonthEqual(d, date))
}

export const isRange = (value: DatePickerModelValue | DateInputModelValue): value is DatePickerRange => {
  return typeof value === 'object' && ('start' in value || 'end' in value)
}

export const isSingleDate = (value: DatePickerModelValue | DateInputModelValue): value is Date => isDate(value)

export const isDates = (value: DatePickerModelValue | DateInputModelValue): value is Date[] => Array.isArray(value)
