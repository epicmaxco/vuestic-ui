import { Ref, computed } from 'vue'
import { DateInputDate, DateInputModelValue, DateInputRange, DateInputValue } from '../types'
import { formatDateToTheSameStandardFormat, parseDate } from '../utils/parse-date'
import { isNil } from '../../../utils/isNilValue'

export const isRange = (date: DateInputModelValue): date is DateInputRange<DateInputDate> => {
  if (date === null) { return false }

  return typeof date === 'object' && ('start' in date || 'end' in date)
}

export const isMultiple = (date: DateInputModelValue): date is DateInputDate[] => {
  if (date === null) { return false }

  return Array.isArray(date)
}

export const isSingleDate = (date: DateInputModelValue): date is DateInputDate => {
  if (date === null) { return false }

  return typeof date === 'string' || typeof date === 'number' || date instanceof Date
}

export const useDateInputModelValue = (
  modelValue: Ref<DateInputModelValue>,
  mode: Ref<'single' | 'multiple' | 'range' | 'auto'>,
  parseModelValue: (date: string) => DateInputModelValue,
  formatModelValue: (date: DateInputModelValue) => string,
  formatModelValueSingleDate?: (date: Date) => string,
) => {
  const syncFormat = (original: DateInputDate | null | undefined, target: Date) => {
    if (formatModelValueSingleDate) {
      return formatModelValueSingleDate(target)
    }

    if (typeof original === 'string') {
      const standardFormat = formatDateToTheSameStandardFormat(target, original)

      if (standardFormat) { return standardFormat }

      return formatModelValue(target)
    }

    if (typeof original === 'number') {
      return target.getTime()
    }

    return target
  }

  const normalizeSingleDate = (value: DateInputDate): Date => {
    if (value instanceof Date) {
      return value
    }

    return new Date(value)
  }

  const dateValue = computed(() => {
    if (modelValue.value === null || modelValue.value === undefined) {
      return null
    }

    if (typeof modelValue.value === 'string') {
      return parseModelValue(modelValue.value)
    }

    if (typeof modelValue.value === 'number') {
      return new Date(modelValue.value)
    }

    return modelValue.value
  })

  const normalized = computed({
    get: () => {
      if (dateValue.value === null || dateValue.value === undefined) {
        return null
      }

      if (isMultiple(dateValue.value)) {
        return dateValue.value.map(normalizeSingleDate)
      }

      if (isRange(dateValue.value)) {
        const { start, end } = dateValue.value

        return {
          start: start ? normalizeSingleDate(start) : null,
          end: end ? normalizeSingleDate(end) : null,
        }
      }

      return normalizeSingleDate(dateValue.value)
    },
    set (newValue: DateInputValue) {
      if (newValue === null || newValue === undefined) {
        modelValue.value = newValue
        return
      }

      if (isMultiple(newValue) && (isMultiple(modelValue.value) || isNil(modelValue.value))) {
        const originalValue = modelValue.value

        modelValue.value = newValue
          .map((v, index) => syncFormat((originalValue)?.[index] || (originalValue)?.[0], v))
        return
      }

      if (isRange(newValue) && (isRange(modelValue.value) || isNil(modelValue.value))) {
        const { start, end } = newValue

        modelValue.value = {
          start: start ? syncFormat(modelValue.value?.start, start) : null,
          // Sync end date only if start date is specified
          end: end ? syncFormat(modelValue.value?.start, end) : null,
        }

        return
      }

      if (isSingleDate(newValue) && (isSingleDate(modelValue.value) || isNil(modelValue.value))) {
        modelValue.value = syncFormat(modelValue.value, newValue)
        return
      }

      throw new Error('Input date is not the same as date from props')
    },
  })

  const text = computed({
    get: () => {
      if (normalized.value === null || normalized.value === undefined) {
        return ''
      }

      return formatModelValue(normalized.value)
    },
    set: (value: string) => {
      modelValue.value = parseModelValue(value)
    },
  })

  return {
    text,
    normalized,
  }
}
