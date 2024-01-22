import { Ref, computed } from 'vue'
import { DateInputDate, DateInputModelValue, DateInputRange, DateInputValue } from '../types'

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

const syncFormat = (original: DateInputDate | null | undefined, target: Date) => {
  // TODO: Not sure here
  if (typeof original === 'string') {
    return target.toLocaleDateString()
  }

  if (typeof original === 'number') {
    return target.getTime()
  }

  return target
}

export const useDateInputModelValue = (
  modelValue: Ref<DateInputModelValue>,
  parseModelValue: (date: string) => DateInputModelValue,
  formatModelValue: (date: DateInputModelValue) => string,
) => {
  const normalizeSingleDate = (value: DateInputDate): Date => {
    if (value instanceof Date) {
      return value
    }

    return new Date(value)
  }

  const normalized = computed({
    get: () => {
      if (modelValue.value === null || modelValue.value === undefined) {
        return null
      }

      if (isMultiple(modelValue.value)) {
        return modelValue.value.map(normalizeSingleDate)
      }

      if (isRange(modelValue.value)) {
        const { start, end } = modelValue.value

        return {
          start: start ? normalizeSingleDate(start) : null,
          end: end ? normalizeSingleDate(end) : null,
        }
      }

      return normalizeSingleDate(modelValue.value)
    },
    set (value: DateInputValue) {
      if (value === null || value === undefined) {
        modelValue.value = value
        return
      }

      if (isMultiple(value) && isMultiple(modelValue.value)) {
        modelValue.value = value
          .map((v, index) => syncFormat((modelValue.value as DateInputDate[])[index], v))
        return
      }

      if (isRange(value) && isRange(modelValue.value)) {
        const { start, end } = value

        modelValue.value = {
          start: start ? syncFormat(modelValue.value.start, start) : null,
          // Sync end date only if start date is specified
          end: end ? syncFormat(modelValue.value.start, end) : null,
        }

        return
      }

      if (isSingleDate(value) && isSingleDate(modelValue.value)) {
        modelValue.value = syncFormat(modelValue.value, value)
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
