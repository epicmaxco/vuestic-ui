import { DatePickerModelValue, DatePickerRange, DatePickerMode } from '../types'
import { isRange, isSingleDate, isDates } from '../utils/date-utils'

const modeInitialValue = (date: Date, mode: DatePickerMode) => {
  if (mode === 'single') {
    return date
  } else if (mode === 'range') {
    return { start: date, end: null }
  } else if (mode === 'multiple') {
    return [date]
  } else if (mode === 'auto') {
    return date
  }

  throw new Error('Unknown mode')
}

const throwIncorrectModelValueError = (modelValue: DatePickerModelValue, mode: DatePickerMode) : never => {
  throw Error(`Incorrect modelValue for mode ${mode}. Got ${JSON.stringify(modelValue)}`)
}

const modeFromModelValue = (modelValue: DatePickerModelValue): DatePickerMode => {
  if (isSingleDate(modelValue)) {
    return 'single'
  } else if (isRange(modelValue)) {
    return 'range'
  } else if (isDates(modelValue)) {
    return 'multiple'
  }

  return throwIncorrectModelValueError(modelValue, 'auto')
}

const sortRange = (modelValue: DatePickerRange) => {
  if (modelValue.start && modelValue.end) {
    if (modelValue.start > modelValue.end) {
      return { start: modelValue.end, end: modelValue.start }
    }
  }

  return modelValue
}

export const useDatePickerModelValue = (
  props: {
    [key: string]: any,
    modelValue?: DatePickerModelValue,
    mode: DatePickerMode
  },
  emit: (event: 'update:modelValue', newValue: DatePickerModelValue) => any,
  dateEqual: (date1?: Date | null, date2?: Date | null) => boolean,
) => {
  const updateModelValue = (date: Date) => {
    if (!props.modelValue) {
      emit('update:modelValue', modeInitialValue(date, props.mode))
      return
    }

    const mode = props.mode === 'auto' ? modeFromModelValue(props.modelValue) : props.mode

    if (mode === 'single') {
      if (!isSingleDate(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      emit('update:modelValue', date)
    } else if (mode === 'range') {
      if (!isRange(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      if (props.modelValue.end && dateEqual(props.modelValue.end, date)) {
        return emit('update:modelValue', { start: props.modelValue.start, end: null })
      }
      if (props.modelValue.start && dateEqual(props.modelValue.start, date)) {
        return emit('update:modelValue', { start: null, end: props.modelValue.end })
      }

      if (props.modelValue.end === null) {
        return emit('update:modelValue', sortRange({ start: props.modelValue.start, end: date }))
      }
      if (props.modelValue.start === null) {
        return emit('update:modelValue', sortRange({ end: props.modelValue.end, start: date }))
      }

      emit('update:modelValue', { start: date, end: null })
    } else if (mode === 'multiple') {
      if (!isDates(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode)
      }

      const isDatesIncludesDate = !!props.modelValue.find((d) => dateEqual(d, date))

      if (isDatesIncludesDate) {
        emit('update:modelValue', props.modelValue.filter((d) => !dateEqual(d, date)))
      } else {
        emit('update:modelValue', [...props.modelValue, date].sort((a, b) => a.getTime() - b.getTime()))
      }
    }
  }

  return {
    updateModelValue,
  }
}
