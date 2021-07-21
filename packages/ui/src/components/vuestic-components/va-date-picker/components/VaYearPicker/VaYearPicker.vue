<template>
  <div class="va-year-picker" ref="rootNode" v-bind="keyboardContainerAttributes" @keydown.space.prevent>
    <va-date-picker-cell
      v-for="(year, yearIndex) in years"
      :key="year"
      :in-range="!!isYearInRange(year)"
      :selected="!!isYearSelected(year)"
      :disabled="!!isYearDisabled(year)"
      :today="!!isTodayYear(year)"
      :focused="focusedDateIndex === yearIndex"
      :hightlight-today="hightlightToday"
      @click="onYearClick(year); focusedDateIndex = yearIndex"
    >
      {{ year }}
    </va-date-picker-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, onMounted, ref, computed, watch } from 'vue'
import { VaDatePickerMode, VaDatePickerModelValue, VaDatePickerView } from '../../types/types'
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { isRange, isSingleDate, isDates, useDatePickerModelValue } from '../../helpers/model-value-helper'
import { createYearDate, isDatesYearEqual } from '../../utils/date-utils'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useHovered } from '../../hooks/hovered-option-hook'

export default defineComponent({
  components: { VaDatePickerCell },

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    allowedYears: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
    hightlightToday: { type: Boolean, default: true },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
    view: { type: Object as PropType<VaDatePickerView>, default: () => ({ type: 'year' }) },
    startYear: { type: Number, default: () => 1970 },
    endYear: { type: Number, default: () => new Date().getFullYear() + 50 },
  },

  emits: ['update:modelValue', 'hover:year', 'click:year'],

  setup (props, { emit }) {
    const { modelValue, view } = toRefs(props)
    const rootNode = ref<HTMLElement | null>(null)

    const { updateModelValue } = useDatePickerModelValue(props, emit)
    const { hovered: hoveredYear } = useHovered<Date>((value) => emit('hover:year', value))

    const generateYearsArray = (start: number, end: number) => {
      const yearsCount = end - start + 1
      return Array.from(Array(yearsCount).keys())
        .map((i) => start + i)
    }

    const years = computed(() => generateYearsArray(props.startYear, props.endYear))

    const scrollIntoYearIndex = (index: number) => {
      if (!rootNode.value) { return }

      const scrollHeight = rootNode.value.scrollHeight
      const rootNodeHeight = rootNode.value.offsetHeight
      const currentYearOffset = scrollHeight / years.value.length * index
      const cellSize = scrollHeight / years.value.length
      const relativeScrollPosition = currentYearOffset - rootNode.value.scrollTop

      if (relativeScrollPosition < 0) {
        // First element in view
        rootNode.value.scrollTo({ top: currentYearOffset })
      } else if (relativeScrollPosition > rootNodeHeight) {
        // Last element in view
        rootNode.value.scrollTo({ top: currentYearOffset - rootNodeHeight + cellSize })
      }
    }

    const scrollIntoYearIndexCenter = (index: number) => {
      if (!rootNode.value) { return }

      const scrollHeight = rootNode.value.scrollHeight
      const rootNodeHeight = rootNode.value.offsetHeight
      const currentYearOffset = scrollHeight / years.value.length * index

      rootNode.value.scrollTo({ top: currentYearOffset - rootNodeHeight / 2 })
    }

    onMounted(() => {
      const currentYearIndex = years.value.indexOf(view.value.year)

      scrollIntoYearIndexCenter(currentYearIndex)
    })

    const onYearClick = (year: number) => {
      const date = createYearDate(year)

      updateModelValue(date)

      emit('click:year', { year, date })
    }

    const isYearSelected = (year: number) => {
      if (!modelValue || !modelValue.value) { return false }

      const date = createYearDate(year)

      if (isSingleDate(modelValue.value)) {
        return isDatesYearEqual(modelValue.value, date)
      } else if (isDates(modelValue.value)) {
        return modelValue.value.find((d) => isDatesYearEqual(d, date))
      } else if (isRange(modelValue.value)) {
        return isDatesYearEqual(modelValue.value.start, date) || isDatesYearEqual(modelValue.value.end, date)
      }
    }

    const isYearInRange = (year: number) => {
      if (!modelValue || !modelValue.value) { return }

      const date = createYearDate(year)

      if (!isRange(modelValue.value)) { return }

      if (modelValue.value.end === null) {
        return modelValue.value.start < date
          ? (hoveredYear.value && hoveredYear.value >= date)
          : (hoveredYear.value && hoveredYear.value <= date)
      }

      return modelValue.value.start < date && modelValue.value.end > date
    }

    const isTodayYear = (year: number) => new Date().getFullYear() === year
    const isYearDisabled = (year: number) => props.allowedYears === undefined ? false : !props.allowedYears(new Date(year))

    const firstModelValueYear = (): number => {
      if (!modelValue || !modelValue.value) { return -1 }

      if (isSingleDate(modelValue.value)) {
        return modelValue.value.getFullYear()
      } else if (isDates(modelValue.value)) {
        return modelValue.value[0].getFullYear()
      } else if (isRange(modelValue.value)) {
        return modelValue.value.start.getFullYear()
      } else {
        return -1
      }
    }

    const {
      focusedCellIndex: focusedDateIndex, containerAttributes: keyboardContainerAttributes,
    } = useGridKeyboardNavigation({
      rowSize: 1,
      start: 0,
      end: years.value.length,
      onFocusIndex: computed(() => years.value.indexOf(view.value.year)),
      onSelected: (selectedIndex) => onYearClick(years.value[selectedIndex]),
    })

    watch(focusedDateIndex, (newValue) => newValue !== -1 && scrollIntoYearIndex(newValue))

    return {
      years,
      rootNode,
      onYearClick,
      isYearSelected,
      isTodayYear,
      isYearInRange,
      isYearDisabled,
      focusedDateIndex,
      keyboardContainerAttributes,
    }
  },
})
</script>

<style lang="scss">
.va-year-picker {
  display: flex;
  flex-direction: column;
  overflow: auto;
  grid-gap: var(--va-date-picker-cell-gap);
  max-height: 100%;
  position: relative;

  .va-year-picker-cell {
    width: 100%;
    height: 30px;
  }
}
</style>
