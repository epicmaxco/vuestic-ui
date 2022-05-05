import { isDatesMonthEqual, isDatesDayEqual, isDatesYearEqual, isDates, isRange, isSingleDate } from './../utils/date-utils'
import { VaDatePickerMode, VaDatePickerModelValue, VaDatePickerType } from '../types'
import { useDatePickerModelValue } from './model-value-helper'
import { computed, ComputedRef, ref, watch } from 'vue'

const getDateEqualFunction = (type: VaDatePickerType) => {
  return {
    month: isDatesMonthEqual,
    day: isDatesDayEqual,
    year: isDatesYearEqual,
  }[type]
}

export const useDatePicker = (
  type: VaDatePickerType,
  dates: ComputedRef<Date[]>,
  props: {
    modelValue?: VaDatePickerModelValue,
    mode: VaDatePickerMode,
    readonly: boolean,
    allowedDays?: (date: Date) => boolean,
    allowedMonths?: (date: Date) => boolean,
    allowedYears?: (date: Date) => boolean,
  },
  emit: (event: 'update:modelValue' | any, ...args: any[]) => void,
) => {
  const datesEqual = getDateEqualFunction(type)
  const isAllowedDate = props.allowedDays || props.allowedMonths || props.allowedYears
  const isDateDisabled = (year: Date) => isAllowedDate === undefined ? false : !isAllowedDate(year)

  const hoveredIndex = ref(0)
  const hoveredValue = computed(() => dates.value[hoveredIndex.value])

  const { updateModelValue } = useDatePickerModelValue(
    props,
    emit,
    datesEqual,
  )

  const onClick = (date: Date) => {
    if (props.readonly || isDateDisabled(date)) { return }

    updateModelValue(date)
    emit(`click:${type}`, date)
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return datesEqual(today, date)
  }

  const isSelected = (date: Date): boolean => {
    if (!props.modelValue) { return false }

    if (isSingleDate(props.modelValue)) {
      return datesEqual(props.modelValue, date)
    } else if (isDates(props.modelValue)) {
      return !!props.modelValue.find((d) => datesEqual(d, date))
    } else if (isRange(props.modelValue)) {
      return datesEqual(props.modelValue.start, date) || datesEqual(props.modelValue.end, date)
    }

    return false
  }

  const isInRange = (date: Date): boolean => {
    if (!props.modelValue) { return false }

    if (!isRange(props.modelValue)) { return false }

    if (props.modelValue.start && props.modelValue.end) {
      return props.modelValue.start < date && props.modelValue.end > date
    }

    const selectedDate = props.modelValue.start || props.modelValue.end

    if (selectedDate) {
      if (!hoveredValue.value) { return false }

      return selectedDate < date
        ? (hoveredValue.value >= date)
        : (hoveredValue.value <= date)
    }

    return false
  }

  watch(hoveredValue, (date) => { emit(`hover:${type}`, date) })

  return {
    hoveredIndex,
    hoveredValue,
    onClick,
    isToday,
    isSelected,
    isInRange,
  }
}
