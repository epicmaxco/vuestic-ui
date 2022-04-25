import isNil from 'lodash/isNil'

import { VaDatePickerModelValue } from '../../va-date-picker/types'
import { defaultParseDateFunction } from './input-text-parser'
import { VaDateInputRange, VaDateInputModelValue } from '../types'

export const isRange = (date: VaDateInputModelValue): date is VaDateInputRange => {
  return typeof date === 'object' && ('start' in date || 'end' in date)
}

export const isSingleDate = (date?: VaDateInputModelValue): date is string | number | Date => {
  return typeof date === 'string' || typeof date === 'number' || date instanceof Date
}

export const parseSingleDate = (date: string | number | Date) => {
  if (typeof date === 'string') {
    return defaultParseDateFunction(date)
  }

  return new Date(date)
}

export const parseModelValue = (date: VaDateInputModelValue): VaDatePickerModelValue => {
  if (isSingleDate(date)) {
    return parseSingleDate(date)
  }

  if (Array.isArray(date)) {
    return date.map(parseSingleDate)
  }

  if (isRange(date)) {
    return {
      start: isNil(date.start) ? date.start : parseSingleDate(date.start),
      end: isNil(date.end) ? date.end : parseSingleDate(date.end),
    }
  }

  return date
}
