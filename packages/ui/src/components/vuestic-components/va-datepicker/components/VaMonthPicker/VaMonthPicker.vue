<template>
  <div class="va-month-picker">
    <div
      class="va-month-picker__month-wrapper"
      v-for="monthIndex in months"
      :key="monthIndex"
      @mouseenter="hoveredMonth = date"
      @mouseleave="hoveredMonth = null"
    >
      <div
        class="va-month-picker__month"
        :class="{
          'va-month-picker__month_current': isMonthCurrentValue(year, monthIndex),
          'va-month-picker__month_in-range': isMonthInRange(year, monthIndex)
        }"
        @click="onMonthClick(year, monthIndex)"
      >
        <slot name="month" v-bind="{ monthIndex, monthName: monthNames[monthIndex] }">
          {{ monthNames[monthIndex] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { useHovered } from '../../hooks/HoveredOptionHook'
import { VaDatePickerModelValue } from '../../types/types'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'

export default defineComponent({
  name: 'VaMonthPicker',

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
    monthNames: { type: Array as PropType<string[]>, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    shouldUpdateModelValue: { type: Boolean, default: true },
  },

  emits: ['update:modelValue', 'hover:month', 'click:month'],

  setup (props, { emit }) {
    const { modelValue, shouldUpdateModelValue } = toRefs(props)

    const { hovered: hoveredMonth } = useHovered<Date>((value) => emit('hover:month', value))

    const months = Array.from(Array(12).keys())

    const updateModelValue = (date: Date) => {
      if (isSingleDate(modelValue.value)) {
        emit('update:modelValue', date)
      } else if (isPeriod(modelValue.value)) {
        if (isDatesEqual(modelValue.value.start, date) || isDatesEqual(modelValue.value.end, date)) { return }

        if (modelValue.value.end !== null) {
          emit('update:modelValue', { start: date, end: null })
          return
        }

        if (date < modelValue.value.start) {
          emit('update:modelValue', { start: date, end: modelValue.value.start })
        } else {
          emit('update:modelValue', { start: modelValue.value.start, end: date })
        }
      } else if (isDates(modelValue.value)) {
        if (isDatesArrayInclude(modelValue.value, date)) {
          emit('update:modelValue', modelValue.value.filter((d) => !isDatesEqual(d, date)))
        } else {
          emit('update:modelValue', [...modelValue.value, date].sort((a, b) => a.getTime() - b.getTime()))
        }
      }
    }

    const onMonthClick = (year: number, month: number) => {
      const date = new Date(year, month)

      if (shouldUpdateModelValue.value) {
        updateModelValue(date)
      }

      emit('click:month', { year, month, date })
    }

    const compareMonths = (date1: Date, date2: Date) => date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()

    const isMonthCurrentValue = (year: number, month: number) => {
      const date = new Date(year, month)

      if (isSingleDate(modelValue.value)) {
        return compareMonths(modelValue.value, date)
      } else if (isDates(modelValue.value)) {
        return modelValue.value.find((d) => compareMonths(d, date))
      } else if (isPeriod(modelValue.value)) {
        return isDatesEqual(modelValue.value.start, date) || isDatesEqual(modelValue.value.end, date)
      }
    }

    const isMonthInRange = (year: number, month: number) => {
      const date = new Date(year, month)

      if (!isPeriod(modelValue.value)) { return }

      if (modelValue.value.end === null) {
        return modelValue.value.start < date
          ? (hoveredMonth.value && hoveredMonth.value >= date)
          : (hoveredMonth.value && hoveredMonth.value <= date)
      }

      return modelValue.value.start < date && modelValue.value.end > date
    }

    return {
      months,
      hoveredMonth,
      onMonthClick,
      isMonthCurrentValue,
      isMonthInRange,
    }
  },
})
</script>

<style lang="scss">
$cell-height: 34px;

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
    font-weight: 600;
    font-size: 12px;
    height: $cell-height;
    line-height: $cell-height;
    position: relative;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    &_in-range {
      &::before {
        content: '';
        border: 2px solid var(--va-primary);
        box-sizing: border-box;
        opacity: 0.7;
      }
    }

    &_not-allowed {
      color: var(--va-warning);
    }

    &:hover {
      &::after {
        background-color: var(--va-primary);
        opacity: 0.1;
      }
    }

    &_current {
      background-color: var(--va-primary);
      color: var(--va-white, white);
    }
  }
}
</style>
