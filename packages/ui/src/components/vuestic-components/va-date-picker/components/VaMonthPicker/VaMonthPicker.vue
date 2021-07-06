<template>
  <div class="va-month-picker" v-bind="keyboardContainerAttributes">
    <div
      class="va-month-picker__month-wrapper"
      v-for="monthIndex in months"
      :key="monthIndex"
      @mouseenter="hoveredMonth = date"
      @mouseleave="hoveredMonth = null"
    >
      <va-date-picker-cell
        :in-range="!!isMonthInRange(view.year, monthIndex)"
        :selected="!!isMonthSelected(view.year, monthIndex)"
        :disabled="!!isMonthDisabled(view.year, monthIndex)"
        :today="!!isTodayMonth(view.year, monthIndex)"
        :focused="focusedDateIndex === monthIndex"
        :hightlight-today="hightlightToday"
        @click="onMonthClick(view.year, monthIndex);  focusedDateIndex = monthIndex"
      >
        <slot name="month" v-bind="{ monthIndex, monthName: monthNames[monthIndex] }">
          {{ monthNames[monthIndex] }}
        </slot>
      </va-date-picker-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { useHovered } from '../../hooks/hovered-option-hook'
import { VaDatePickerMode, VaDatePickerView, VaDatePickerModelValue } from '../../types/types'
import { isRange, isSingleDate, isDates, useDatePickerModelValue } from '../../helpers/model-value-helper'
import { isDatesMonthEqual } from '../../utils/date-utils'
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'

export default defineComponent({
  name: 'VaMonthPicker',

  components: { VaDatePickerCell },

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    monthNames: { type: Array as PropType<string[]>, required: true },
    view: { type: Object as PropType<VaDatePickerView>, default: () => ({ type: 'day' }) },
    allowedMonths: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
    hightlightToday: { type: Boolean, default: true },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
  },

  emits: ['update:modelValue', 'hover:month', 'click:month'],

  setup (props, { emit }) {
    const { modelValue, view } = toRefs(props)

    const { hovered: hoveredMonth } = useHovered<Date>((value) => emit('hover:month', value))

    const months = Array.from(Array(12).keys())

    const { updateModelValue } = useDatePickerModelValue(props, emit)

    const onMonthClick = (year: number, month: number) => {
      const date = new Date(year, month)

      updateModelValue(date)

      emit('click:month', { year, month, date })
    }

    const isMonthSelected = (year: number, month: number) => {
      if (!modelValue || !modelValue.value) { return }

      const date = new Date(year, month)

      if (isSingleDate(modelValue.value)) {
        return isDatesMonthEqual(modelValue.value, date)
      } else if (isDates(modelValue.value)) {
        return modelValue.value.find((d) => isDatesMonthEqual(d, date))
      } else if (isRange(modelValue.value)) {
        return isDatesMonthEqual(modelValue.value.start, date) || isDatesMonthEqual(modelValue.value.end, date)
      }
    }

    const isTodayMonth = (year: number, month: number) => {
      const date = new Date(year, month)
      const today = new Date()

      return isDatesMonthEqual(today, date)
    }

    const isMonthInRange = (year: number, month: number) => {
      if (!modelValue || !modelValue.value) { return }

      const date = new Date(year, month)

      if (!isRange(modelValue.value)) { return }

      if (modelValue.value.end === null) {
        return modelValue.value.start < date
          ? (hoveredMonth.value && hoveredMonth.value >= date)
          : (hoveredMonth.value && hoveredMonth.value <= date)
      }

      return modelValue.value.start < date && modelValue.value.end > date
    }

    const isMonthDisabled = (year: number, month: number) => props.allowedMonths === undefined ? false : !props.allowedMonths(new Date(year, month))

    const {
      focusedCellIndex: focusedDateIndex, containerAttributes: keyboardContainerAttributes,
    } = useGridKeyboardNavigation(4, {
      start: 0,
      end: months.length,
    }, (selectedIndex) => onMonthClick(view.value.year, selectedIndex))

    return {
      months,
      hoveredMonth,
      onMonthClick,
      isMonthSelected,
      isMonthInRange,
      isMonthDisabled,
      isTodayMonth,
      focusedDateIndex,
      keyboardContainerAttributes,
    }
  },
})
</script>

<style lang="scss">
.va-month-picker {
  display: grid;
  // 4 columns
  grid-template-columns: (100% / 4) (100% / 4) (100% / 4) (100% / 4);

  &__month-wrapper {
    padding: 1px;
    border-radius: 6px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
  }

  &__month {
    color: var(--va-secondary);
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    height: var(--va-date-picker-cell-size);
    line-height: var(--va-date-picker-cell-size);
    position: relative;
  }
}
</style>
