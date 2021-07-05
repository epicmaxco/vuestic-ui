<template>
  <div class="va-day-picker">
    <div class="va-day-picker__weekdays" v-if="!hideWeekDays">
      <div
        v-for="weekday in weekdayNamesComputed" :key="weekday"
        class="va-day-picker__weekdays__cell"
      >
        <slot name="weekday">
          {{ weekday }}
        </slot>
      </div>
    </div>

    <div
      class="va-day-picker__calendar"
      v-bind="keyboardContainerAttributes"
    >
      <div
        class="va-day-picker__calendar__day-wrapper"
        v-for="(date, index) in calendarDates"
        :key="date"
      >
        <va-day-picker-cell
          v-bind="VaDayPickerCellPropValues"
          :date="date"
          :selected-value="modelValue"
          :currentMonth="view.month"
          :hovered-date="hoveredDate?.date"
          :focused="focusedDateIndex === index"
          @click="onDateClick($event), focusedDateIndex = index"
          @mouseenter="hoveredDate = { date, index }"
          @mouseleave="hoveredDate = null"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-day-picker-cell>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, PropType } from 'vue'
import { useVaDatePickerCalendar } from './va-date-picker-calendar-hook'
import { isRange, isSingleDate, isDates, useDatePickerModelValue } from '../../helpers/model-value-helper'
import { isDatesArrayIncludeDay, isDatesDayEqual } from '../../utils/date-utils'
import { VaDatePickerMode, VaDatePickerModelValue, VaDatePickerType } from '../../types/types'
import VaDayPickerCell from './VaDayPickerCell.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { useHovered } from '../../hooks/hovered-option-hook'
import { DatePickerView } from '../../helpers/date-picker-view'
import { useGridKeyboardNavigation } from '../../hooks/grid-keyboard-navigation'

const VaDayPickerCellProps = extractComponentProps(VaDayPickerCell, ['date', 'selectedValue', 'hoveredDate'])

export default defineComponent({
  name: 'VaDayPicker',

  components: { VaDayPickerCell },

  props: {
    ...VaDayPickerCellProps,
    monthNames: { type: Array as PropType<string[]>, required: true },
    weekdayNames: { type: Array as PropType<string[]>, required: true },
    firstWeekday: { type: String as PropType<'Monday' | 'Sunday'>, default: 'Sunday' },
    hideWeekDays: { type: Boolean, default: false },
    view: { type: Object as PropType<DatePickerView>, default: () => new DatePickerView() },
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    type: { type: String as PropType<VaDatePickerType>, default: 'day' },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
  },

  emits: ['update:modelValue', 'hover:day', 'click:day'],

  setup (props, { emit }) {
    const { firstWeekday, weekdayNames, view } = toRefs(props)

    const VaDayPickerCellPropValues = filterComponentProps(props, VaDayPickerCellProps)

    const { calendarDates, currentMonthStartIndex, currentMonthEndIndex } = useVaDatePickerCalendar(view, { firstWeekday })

    const { hovered: hoveredDate } = useHovered<{ date: Date, index: number }>((value) => emit('hover:day', value?.date))

    const { updateModelValue } = useDatePickerModelValue(props, emit)

    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value === 'Sunday'
        ? weekdayNames.value
        : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
    })

    const onDateClick = (date: Date) => {
      const isDateDisabed = props.allowedDays === undefined ? false : !props.allowedDays(date)

      emit('click:day', { date, isDateDisabed })

      if (isDateDisabed) { return }

      updateModelValue(date)
    }

    const gridStartIndex = computed(() => props.showOtherMonths ? 0 : currentMonthStartIndex.value)
    const gridEndIndex = computed(() => props.showOtherMonths ? calendarDates.value.length : currentMonthEndIndex.value)

    const {
      focusedCellIndex: focusedDateIndex, containerAttributes: keyboardContainerAttributes,
    } = useGridKeyboardNavigation(7, {
      start: gridStartIndex,
      end: gridEndIndex,
    }, (selectedValue) => onDateClick(calendarDates.value[selectedValue]))

    return {
      hoveredDate,
      calendarDates,
      onDateClick,
      keyboardContainerAttributes,
      weekdayNamesComputed,
      VaDayPickerCellPropValues,
      focusedDateIndex,
    }
  },
})
</script>

<style lang="scss">
.va-day-picker {
  &__weekdays {
    display: flex;

    &__cell {
      width: calc(100% / 7);
      text-align: center;
      font-size: 9px;
      color: var(--va-secondary);
      font-weight: bold;
      height: var(--va-date-picker-cell-size);
      line-height: var(--va-date-picker-cell-size);
    }
  }

  &__calendar {
    display: grid;
    // 7 columns
    grid-template-columns: (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7);

    &__day-wrapper {
      padding: 1px;
      box-sizing: border-box;
    }
  }
}
</style>
