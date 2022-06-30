import isNil from 'lodash/isNil'

import { DatePickerModelValue } from '../../va-date-picker/types'
import { defaultParseDateFunction } from './input-text-parser'
import { DateInputRange, DateInputModelValue, DateInputDate } from '../types'

export const isRange = (date: DateInputModelValue): date is DateInputRange<DateInputDate> => {
  return typeof date === 'object' && ('start' in date || 'end' in date)
}

export const parseSingleDate = (date: DateInputDate) => typeof date === 'string'
  ? defaultParseDateFunction(date)
  : new Date(date)

export const parseModelValue = (date: DateInputModelValue): DatePickerModelValue => {
  if (Array.isArray(date)) {
    return date.map(parseSingleDate)
  }

  if (isRange(date)) {
    return {
      start: isNil(date.start) ? date.start : parseSingleDate(date.start),
      end: isNil(date.end) ? date.end : parseSingleDate(date.end),
    }
  }

  return parseSingleDate(date!)
}
