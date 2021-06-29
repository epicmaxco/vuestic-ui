<template>
  <div
    v-if="isCurrentView || showOtherMonths"
    class="va-date-picker-cell"
    :class="{
      'va-date-picker-cell_current-view': isCurrentView,
      'va-date-picker-cell_today': highlightTodayDate && isToday,
      'va-date-picker-cell_in-range': isDateInRange,
      'va-date-picker-cell_disabled': isDateDisabled,
      'va-date-picker-cell_hightlighted-weekend': highlightWeekends && isDateWeekend,
      'va-date-picker-cell_selected': isDateSelected,
    }"
    @mouseenter="hoveredDate = date"
    @mouseleave="hoveredDate = null"
    @click="onDateClick"
  >
    <span class="va-date-picker-cell__day">
      <slot name="day" v-bind="{ date }">
        {{ date.getDate() }}
      </slot>
    </span>
  </div>
  <div
    v-else
    class="va-date-picker-cell va-date-picker-cell_clear"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { VaDatePickerModelValue } from '../../types/types'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'
import { useHovered } from '../../hooks/hovered-option-hook'

export default defineComponent({
  name: 'VaDayPickerCell',

  props: {
    selectedValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
    date: { type: Date, required: true },

    // Inherited props
    currentMonth: { type: Number },
    weekends: { type: [Function] as PropType<(d: Date) => boolean> },
    allowedDates: { type: Function as PropType<(date: Date) => boolean> },
    highlightWeekends: { type: Boolean, default: false },
    highlightTodayDate: { type: Boolean, default: true },
    showOtherMonths: { type: Boolean, default: false },
  },

  emits: ['click', 'hover'],

  setup (props, { emit }) {
    const isCurrentView = computed(() => props.currentMonth === props.date.getMonth())
    const isDateDisabled = computed(() => props.allowedDates === undefined ? false : !props.allowedDates(props.date))

    const isDateWeekend = computed(() => {
      if (props.weekends === undefined) {
        return props.date.getDay() === 6 || props.date.getDay() === 0 // 0 - Sunday, 6 - Saturday
      }

      return props.weekends(props.date)
    })

    const isDateSelected = computed(() => {
      if (isSingleDate(props.selectedValue)) {
        return props.selectedValue.toDateString() === props.date.toDateString()
      } else if (isDates(props.selectedValue)) {
        return isDatesArrayInclude(props.selectedValue, props.date)
      } else if (isPeriod(props.selectedValue)) {
        return isDatesEqual(props.selectedValue.start, props.date) || isDatesEqual(props.selectedValue.end, props.date)
      }

      throw new Error('Unknown modelValue type')
    })

    const { hovered: hoveredDate } = useHovered<Date>((value) => emit('hover', value))

    const isDateInRange = computed(() => {
      if (!isPeriod(props.selectedValue)) { return }

      if (props.selectedValue.end === null) {
        return props.selectedValue.start < props.date
          ? (hoveredDate.value && hoveredDate.value >= props.date)
          : (hoveredDate.value && hoveredDate.value <= props.date)
      }

      return props.selectedValue.start < props.date && props.selectedValue.end > props.date
    })

    const isToday = computed((): boolean => props.date.toDateString() === new Date().toDateString())

    const onDateClick = () => {
      if (isDateDisabled.value) {
        return
      }

      if (!isCurrentView.value && props.showOtherMonths) {
        return
      }

      emit('click', props.date)
    }

    return {
      hoveredDate,
      isToday,
      isCurrentView,
      isDateDisabled,
      isDateWeekend,
      isDateSelected,
      isDateInRange,
      onDateClick,
    }
  },
})
</script>

<style lang="scss" scoped>
$cell-size: 34px;

.va-date-picker-cell {
  position: relative;
  color: var(--va-secondary);
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  height: $cell-size;
  min-width: $cell-size;
  line-height: $cell-size;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  text-align: center;

  &__day {
    position: relative;
    z-index: 1;
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    box-sizing: border-box;
    border-radius: 6px;
  }

  &:hover {
    &::after {
      background-color: var(--va-primary);
      opacity: 0.1;
    }
  }

  &_current-view {
    color: var(--va-dark);
  }

  &_today {
    &::after {
      background-color: var(--va-primary);
      opacity: 0.3;
    }
  }

  &_in-range {
    &::before {
      border: 2px solid var(--va-primary);
      opacity: 0.7;
    }
  }

  &_disabled {
    cursor: default;
    color: var(--va-secondary);
    opacity: 0.5;

    &:hover {
      &::after {
        display: none;
      }
    }

    &.va-date-picker-cell_today:hover::after {
      display: block;
    }
  }

  &_hightlighted-weekend {
    color: var(--va-danger);
  }

  &_selected {
    background-color: var(--va-primary);
    color: var(--va-white, white);
  }

  &_clear {
    cursor: default;

    &::after {
      display: none;
    }
  }
}
</style>
