<template>
  <div
    class="va-year-picker"
    ref="rootNode"
    v-bind="containerAttributes"
    @keydown.space.prevent
  >
    <va-date-picker-cell
      v-for="(year, index) in years"
      :key="year"
      :in-range="isInRange(year)"
      :selected="isSelected(year)"
      :disabled="isYearDisabled(year)"
      :today="isToday(year)"
      :focused="focusedCellIndex === index"
      :highlight-today="highlightToday"
      :readonly="readonly"
      @click="onClick(year); focusedCellIndex = index"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = -1"
    >
      {{ year.getFullYear() }}
    </va-date-picker-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, onMounted, ref, computed, watch } from 'vue'
import { VaDatePickerMode, VaDatePickerModelValue, VaDatePickerView } from '../../types/types'
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { createYearDate, isDatesYearEqual } from '../../utils/date-utils'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useDatePicker } from '../../hooks/use-picker'

export default defineComponent({
  name: 'VaYearPicker',
  components: { VaDatePickerCell },

  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    allowedYears: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
    highlightToday: { type: Boolean, default: true },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
    view: { type: Object as PropType<VaDatePickerView>, default: () => ({ type: 'year' }) },
    startYear: { type: Number, default: () => 1970 },
    endYear: { type: Number, default: () => new Date().getFullYear() + 50 },
    readonly: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'hover:year', 'click:year'],

  setup (props, { emit }) {
    const { view } = toRefs(props)
    const rootNode = ref<HTMLElement | null>(null)

    const generateYearsArray = (start: number, end: number) => {
      const yearsCount = end - start + 1
      return Array.from(Array(yearsCount).keys())
        .map((i) => createYearDate(start + i))
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
      const currentYearIndex = years.value.findIndex((date) => date.getFullYear() === view.value.year)

      scrollIntoYearIndexCenter(currentYearIndex)
    })

    const {
      hoveredIndex,
      onClick,
      isToday,
      isSelected,
      isInRange,
    } = useDatePicker('year', years, props, emit)

    const isYearDisabled = (year: Date) => props.allowedYears === undefined ? false : !props.allowedYears(year)

    const {
      focusedCellIndex, containerAttributes,
    } = useGridKeyboardNavigation({
      rowSize: 1,
      start: 0,
      end: years.value.length,
      onFocusIndex: computed(() => years.value.findIndex((date) => date.getFullYear() === view.value.year)),
      onSelected: (selectedIndex) => onClick(years.value[selectedIndex]),
    })

    watch(focusedCellIndex, (index) => index !== -1 && scrollIntoYearIndex(index))
    watch(focusedCellIndex, (index) => { hoveredIndex.value = index })
    watch(hoveredIndex, (index) => { focusedCellIndex.value = index })

    return {
      hoveredIndex,
      years,
      rootNode,
      onClick,
      isToday,
      isSelected,
      isInRange,
      isYearDisabled,
      focusedCellIndex,
      containerAttributes,
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
}
</style>
