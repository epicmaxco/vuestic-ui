<template>
  <div class="va-month-picker" v-bind="containerAttributes">
    <div
      v-for="(month, monthIndex) in months"
      :key="monthIndex"
      class="va-month-picker__month-wrapper"
      @mouseenter="hoveredIndex = monthIndex"
      @mouseleave="hoveredIndex = -1"
    >
      <va-date-picker-cell
        :in-range="!!isInRange(month)"
        :selected="!!isSelected(month)"
        :disabled="!!isDisabled(month)"
        :today="!!isToday(month)"
        :focused="hoveredIndex === monthIndex"
        :highlight-today="highlightToday"
        :readonly="$props.readonly"
        :color="color"
        @click="onClick(month); focusedCellIndex = monthIndex"
      >
        <slot name="month" v-bind="{ monthIndex, month: monthNames[monthIndex] }">
          {{ monthNames[monthIndex] }}
        </slot>
      </va-date-picker-cell>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { computed, PropType, toRefs, watch } from 'vue'

import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useDatePicker } from '../../hooks/use-picker'

import { DatePickerMode, DatePickerView, DatePickerModelValue } from '../../types'

defineOptions({
  name: 'VaMonthPicker',
})

const props = defineProps({
  modelValue: { type: [Date, Array, Object] as PropType<DatePickerModelValue> },
  monthNames: { type: Array as PropType<string[]>, required: true },
  view: { type: Object as PropType<DatePickerView>, default: () => ({ type: 'month' }) },
  allowedMonths: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
  highlightToday: { type: Boolean, default: true },
  mode: { type: String as PropType<DatePickerMode>, default: 'auto' },
  readonly: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
})

const emit = defineEmits(['update:modelValue', 'hover:month', 'click:month'])

const { view } = toRefs(props)

const months = computed(() => Array.from(Array(12).keys()).map((month) => new Date(view.value.year, month)))

const {
  hoveredIndex,
  onClick,
  isToday,
  isSelected,
  isInRange,
} = useDatePicker('month', months, props, emit)

const isDisabled = (date: Date) => props.allowedMonths === undefined ? false : !props.allowedMonths(date)

const {
  focusedCellIndex, containerAttributes,
} = useGridKeyboardNavigation({
  rowSize: 3,
  start: 0,
  end: months.value.length,
  onSelected: (selectedIndex) => onClick(months.value[selectedIndex]),
})

watch(focusedCellIndex, (index) => { hoveredIndex.value = index })
watch(hoveredIndex, (index) => { focusedCellIndex.value = index })
</script>

<style lang="scss">
.va-month-picker {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 4 columns
  grid-gap: var(--va-date-picker-cell-gap);
  min-width: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6); // 7 days + gap
  width: 100%;

  &__month-wrapper {
    border-radius: var(--va-date-picker-cell-radius);
    text-align: center;
    user-select: none;
    overflow: hidden;
  }
}
</style>
