<template>
  <div class="va-day-picker" v-bind="containerAttributes">
    <template v-if="!hideWeekDays">
      <div
        v-for="weekday in weekdayNamesComputed" :key="weekday"
        class="va-day-picker__weekday"
      >
        <slot name="weekday">
          {{ weekday }}
        </slot>
      </div>
    </template>

    <div
      class="va-day-picker__calendar__day-wrapper"
      v-for="(date, index) in calendarDates"
      :key="index"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = -1"
    >
      <va-date-picker-cell
        :hidden="isOtherMonth(date) && !showOtherMonths"
        :today="isToday(date)"
        :selected="isSelected(date)"
        :in-range="isInRange(date)"
        :other-month="isOtherMonth(date)"
        :weekend="isDateWeekend(date)"
        :disabled="isDateDisabled(date)"
        :focused="hoveredIndex === index"
        :highlight-today="highlightToday"
        :highlight-weekend="highlightWeekend"
        :readonly="$props.readonly"
        :color="color"
        @click="onClick(date); focusedCellIndex = index"
      >
        <span class="va-date-picker-cell__day">
          <slot name="day" v-bind="{ date }">
            {{ date.getDate() }}
          </slot>
        </span>
      </va-date-picker-cell>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { computed, toRefs, PropType, watch } from 'vue'

import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useDatePicker } from '../../hooks/use-picker'
import { useVaDatePickerCalendar } from './va-date-picker-calendar-hook'

import { DatePickerMode, DatePickerModelValue, DatePickerView } from '../../types'

defineOptions({
  name: 'VaDayPicker',
})

type CaseInsensitive<T extends string> = T | Lowercase<T>

const props = defineProps({
  monthNames: { type: Array as PropType<string[]>, required: true },
  weekdayNames: { type: Array as PropType<string[]>, required: true },
  firstWeekday: { type: String as PropType<CaseInsensitive<'Monday' | 'Sunday'>>, default: 'Sunday' },
  hideWeekDays: { type: Boolean, default: false },
  view: { type: Object as PropType<DatePickerView>, default: () => ({ type: 'day' }) },
  modelValue: { type: [Date, Array, Object] as PropType<DatePickerModelValue> },
  mode: { type: String as PropType<DatePickerMode>, default: 'auto' },
  showOtherMonths: { type: Boolean, default: false },
  allowedDays: { type: Function as PropType<(date: Date) => boolean> },
  weekends: { type: Function as PropType<(date: Date) => boolean> },
  highlightWeekend: { type: Boolean, default: false },
  highlightToday: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
})

const emit = defineEmits(['update:modelValue', 'hover:day', 'click:day'])

const { firstWeekday, weekdayNames, view } = toRefs(props)

const { calendarDates, currentMonthStartIndex, currentMonthEndIndex } = useVaDatePickerCalendar(view, { firstWeekday })

const weekdayNamesComputed = computed(() => {
  return firstWeekday.value.toLowerCase() === 'sunday'
    ? weekdayNames.value
    : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
})

const {
  hoveredIndex,
  onClick,
  isToday,
  isSelected,
  isInRange,
} = useDatePicker('day', calendarDates, props, emit)

const gridStartIndex = computed(() => props.showOtherMonths ? 0 : currentMonthStartIndex.value)
const gridEndIndex = computed(() => props.showOtherMonths ? calendarDates.value.length : currentMonthEndIndex.value)

const {
  focusedCellIndex, containerAttributes,
} = useGridKeyboardNavigation({
  rowSize: 7,
  start: gridStartIndex,
  end: gridEndIndex,
  onSelected: (selectedValue) => onClick(calendarDates.value[selectedValue]),
})

watch(focusedCellIndex, (index) => { hoveredIndex.value = index })
watch(hoveredIndex, (index) => { focusedCellIndex.value = index })

const isOtherMonth = (date: Date) => props.view.month !== date.getMonth()
const isDateDisabled = (date: Date) => props.allowedDays === undefined ? false : !props.allowedDays(date)
const isDateWeekend = (date: Date) => {
  if (props.weekends === undefined) {
    return date.getDay() === 6 || date.getDay() === 0 // 0 - Sunday, 6 - Saturday
  }

  return props.weekends(date)
}
</script>

<style lang="scss">
.va-day-picker {
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 7 columns
  grid-gap: var(--va-date-picker-cell-gap);

  &__weekday {
    height: var(--va-date-picker-cell-size);
    color: var(--va-secondary);
    text-align: center;
    font-size: var(--va-date-picker-weekday-font-size);
    font-weight: bold;
    line-height: var(--va-date-picker-cell-size);
  }
}
</style>
