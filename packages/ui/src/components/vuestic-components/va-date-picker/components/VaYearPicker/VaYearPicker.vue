<template>
  <div class="va-year-picker" ref="rootNode">
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
import { defineComponent, PropType, toRefs, onMounted, ref } from 'vue'
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
  },

  emits: ['update:modelValue', 'hover:year', 'click:year'],

  setup (props, { emit }) {
    const { modelValue, view } = toRefs(props)
    const rootNode = ref<HTMLElement | null>(null)

    const { updateModelValue } = useDatePickerModelValue(props, emit)
    const { hovered: hoveredYear } = useHovered<Date>((value) => emit('hover:year', value))

    const YEAR_COUNT = 100
    const TODAY_YEAR = new Date().getFullYear()
    const indexToYear = (index: number) => -YEAR_COUNT / 2 + index + TODAY_YEAR - 1
    const yearToIndex = (year: number) => YEAR_COUNT / 2 + year - TODAY_YEAR + 1
    const years = Array.from(Array(YEAR_COUNT + 1).keys()).map((i) => indexToYear(i))
    // Used to scroll down to next 3 month. This way current year appears in the middle.
    const VIEW_YEAR_OFFSET = 3

    onMounted(() => {
      if (!rootNode.value) { return }

      const scrollHeight = rootNode.value.scrollHeight
      const scrollElementIndex = yearToIndex(view.value.year) - VIEW_YEAR_OFFSET
      rootNode.value.scrollTo({ top: scrollHeight / YEAR_COUNT * scrollElementIndex })
    })

    const onYearClick = (year: number) => {
      const date = createYearDate(year)

      updateModelValue(date)

      emit('click:year', { year, date })
    }

    const isYearSelected = (year: number) => {
      if (!modelValue || !modelValue.value) { return }

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

    const isTodayYear = (year: number) => {
      const today = new Date()

      return today.getFullYear() === year
    }

    const isYearDisabled = (year: number) => props.allowedYears === undefined ? false : !props.allowedYears(new Date(year))

    const {
      focusedCellIndex: focusedDateIndex, containerAttributes: keyboardContainerAttributes,
    } = useGridKeyboardNavigation(1, {
      start: 0,
      end: years.length,
    }, (selectedIndex) => onYearClick(selectedIndex))

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

  .va-year-picker-cell {
    width: 100%;
    height: 30px;
  }
}
</style>
