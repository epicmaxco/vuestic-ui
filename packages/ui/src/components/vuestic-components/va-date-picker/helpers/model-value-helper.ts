import { VaDatePickerModelValue, VaDatePickerModelValuePeriod, VaDatePickerMode } from '../types/types'
import { isDatesArrayIncludeDay, isDatesDayEqual } from '../utils/date-utils'

export const isRange = (value: VaDatePickerModelValue): value is VaDatePickerModelValuePeriod => {
  return typeof (value as any).start !== 'undefined' && typeof (value as any).end !== 'undefined'
}
export const isSingleDate = (value: VaDatePickerModelValue): value is Date => value instanceof Date
export const isDates = (value: VaDatePickerModelValue): value is Date[] => Array.isArray(value)

const modeInitialValue = (date: Date, mode: VaDatePickerMode) => {
  if (mode === 'date') {
    return date
  } else if (mode === 'range') {
    return { start: date, end: null }
  } else if (mode === 'dates') {
    return [date]
  } else if (mode === 'auto') {
    return date
  }

  throw new Error('Unknown mode')
}

const throwIncorrectModelValueError = (modelValue: VaDatePickerModelValue, mode: VaDatePickerMode) : never => {
  throw Error(`Incorrect modelValue for mode ${mode}. Got ${JSON.stringify(modelValue)}`)
}

const modeFromModelValue = (modelValue: VaDatePickerModelValue): VaDatePickerMode => {
  if (isSingleDate(modelValue)) {
    return 'date'
  } else if (isRange(modelValue)) {
    return 'range'
  } else if (isDates(modelValue)) {
    return 'dates'
  }

  return throwIncorrectModelValueError(modelValue, 'auto')
}

export const useDatePickerModelValue = (props: { [key: string]: any, modelValue?: VaDatePickerModelValue, mode: VaDatePickerMode }, emit: (event: 'update:modelValue', newValue: VaDatePickerModelValue) => any) => {
  const updateModelValue = (date: Date) => {
    if (!props.modelValue) {
      emit('update:modelValue', modeInitialValue(date, props.mode))
      return
    }

    const mode = props.mode === 'auto' ? modeFromModelValue(props.modelValue) : props.mode

    if (mode === 'date') {
      if (!isSingleDate(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      emit('update:modelValue', date)
    } else if (mode === 'range') {
      if (!isRange(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      if (props.modelValue.end !== null) {
        emit('update:modelValue', { start: date, end: null })
        return
      }

      if (date < props.modelValue.start) {
        emit('update:modelValue', { start: date, end: props.modelValue.start })
      } else {
        emit('update:modelValue', { start: props.modelValue.start, end: date })
      }
    } else if (mode === 'dates') {
      if (!isDates(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      if (isDatesArrayIncludeDay(props.modelValue, date)) {
        emit('update:modelValue', props.modelValue.filter((d) => !isDatesDayEqual(d, date)))
      } else {
        emit('update:modelValue', [...props.modelValue, date].sort((a, b) => a.getTime() - b.getTime()))
      }
    }
  }

  return {
    updateModelValue,
  }
}
