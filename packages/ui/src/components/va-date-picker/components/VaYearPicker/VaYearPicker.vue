<template>
  <div
    ref="rootNode"
    class="va-year-picker"
    v-bind="containerAttributes"
    @keydown.space.prevent
  >
    <va-date-picker-cell
      v-for="(year, index) in years"
      :key="year.toString()"
      :in-range="isInRange(year)"
      :selected="isSelected(year)"
      :disabled="isYearDisabled(year)"
      :today="isToday(year)"
      :focused="focusedCellIndex === index"
      :highlight-today="highlightToday"
      :readonly="$props.readonly"
      :color="color"
      @click="onClick(year); focusedCellIndex = index"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = -1"
    >
      {{ year.getFullYear() }}
    </va-date-picker-cell>
  </div>
</template>

<script lang="ts" setup>
import VaDatePickerCell from '../VaDatePickerCell.vue'
import { PropType, toRefs, onMounted, computed, watch, shallowRef } from 'vue'

import { createYearDate } from '../../utils/date-utils'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'
import { useDatePicker } from '../../hooks/use-picker'
import { makeNumericProp, useNumericProp } from '../../../../composables'

import { DatePickerMode, DatePickerModelValue, DatePickerView } from '../../types'

defineOptions({
  name: 'VaYearPicker',
})

const props = defineProps({
  modelValue: { type: [Date, Array, Object] as PropType<DatePickerModelValue> },
  allowedYears: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
  highlightToday: { type: Boolean, default: true },
  startYear: makeNumericProp({ default: 1970 }),
  mode: { type: String as PropType<DatePickerMode>, default: 'auto' },
  view: { type: Object as PropType<DatePickerView>, default: () => ({ type: 'year' }) },
  endYear: makeNumericProp({ default: () => new Date().getFullYear() + 50 }),
  readonly: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
})

const emit = defineEmits(['update:modelValue', 'hover:year', 'click:year'])

const rootNode = shallowRef<HTMLElement>()

const { view } = toRefs(props)

const generateYearsArray = (start: number, end: number) => {
  const yearsCount = end - start + 1
  return Array.from(Array(yearsCount).keys())
    .map((i) => createYearDate(start + i))
}

const startYearComputed = useNumericProp('startYear')
const endYearComputed = useNumericProp('endYear')

const years = computed(() => generateYearsArray(startYearComputed.value!, endYearComputed.value!))

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
</script>

<style lang="scss">
@import '../../../../styles/resources';

.va-year-picker {
  display: flex;
  flex-direction: column;
  overflow: auto;
  grid-gap: var(--va-date-picker-cell-gap);
  max-height: 100%;
  position: relative;

  @include va-scroll();
}
</style>
