<template>
  <div class="va-month-picker" v-bind="containerAttributes">
    <div
      class="va-month-picker__month-wrapper"
      v-for="(month, monthIndex) in months"
      :key="monthIndex"
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
        :readonly="readonly"
        @click="onClick(month); focusedCellIndex = monthIndex"
      >
        <slot name="month" v-bind="{ monthIndex, month: monthNames[monthIndex] }">
          {{ monthNames[monthIndex] }}
        </slot>
      </va-date-picker-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, watch } from 'vue'
import { VaDatePickerMode, VaDatePickerView, VaDatePickerModelValue } from '../../types/types'
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useDatePicker } from '../../hooks/use-picker'

export default defineComponent({
  name: 'VaMonthPicker',

  components: { VaDatePickerCell },

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    monthNames: { type: Array as PropType<string[]>, required: true },
    view: { type: Object as PropType<VaDatePickerView>, default: () => ({ type: 'month' }) },
    allowedMonths: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
    highlightToday: { type: Boolean, default: true },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
    readonly: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'hover:month', 'click:month'],

  setup (props, { emit }) {
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

    return {
      months,
      hoveredIndex,
      onClick,
      isToday,
      isSelected,
      isInRange,
      isDisabled,
      containerAttributes,
    }
  },
})
</script>

<style lang="scss">
.va-month-picker {
  display: grid;
  // 4 columns
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--va-date-picker-cell-gap);
  // 7 days + gap
  min-width: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);
  width: 100%;

  &__month-wrapper {
    padding: 1px;
    border-radius: 6px;
    text-align: center;
    user-select: none;
    overflow: hidden;
  }

  &__month {
    color: var(--va-secondary);
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    height: var(--va-date-picker-cell-size);
    line-height: var(--va-date-picker-cell-size);
    position: relative;
  }
}
</style>
