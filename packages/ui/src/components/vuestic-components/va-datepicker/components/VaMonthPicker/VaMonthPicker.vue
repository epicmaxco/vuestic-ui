<template>
  <div class="va-month-picker">
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
        @click="onMonthClick(view.year, monthIndex)"
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
import { VaDatePickerModelValue } from '../../types/types'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayIncludeMonth, isDatesMonthEqual } from '../../utils/date-utils'
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { DatePickerView } from '../../helpers/date-picker-view'

export default defineComponent({
  name: 'VaMonthPicker',

  components: { VaDatePickerCell },

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
    monthNames: { type: Array as PropType<string[]>, required: true },
    view: { type: Object as PropType<DatePickerView>, default: () => new DatePickerView() },
    shouldUpdateModelValue: { type: Boolean, default: true },
    allowedMonths: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
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
        if (isDatesMonthEqual(modelValue.value.start, date) || isDatesMonthEqual(modelValue.value.end, date)) { return }

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
        if (isDatesArrayIncludeMonth(modelValue.value, date)) {
          emit('update:modelValue', modelValue.value.filter((d) => !isDatesMonthEqual(d, date)))
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

    const isMonthSelected = (year: number, month: number) => {
      const date = new Date(year, month)

      if (isSingleDate(modelValue.value)) {
        return isDatesMonthEqual(modelValue.value, date)
      } else if (isDates(modelValue.value)) {
        return modelValue.value.find((d) => isDatesMonthEqual(d, date))
      } else if (isPeriod(modelValue.value)) {
        return isDatesMonthEqual(modelValue.value.start, date) || isDatesMonthEqual(modelValue.value.end, date)
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

    const isMonthDisabled = (year: number, month: number) => props.allowedMonths === undefined ? false : !props.allowedMonths(new Date(year, month))

    return {
      months,
      hoveredMonth,
      onMonthClick,
      isMonthSelected,
      isMonthInRange,
      isMonthDisabled,
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
