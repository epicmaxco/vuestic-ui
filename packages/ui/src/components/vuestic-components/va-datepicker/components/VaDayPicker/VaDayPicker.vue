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
      tabindex="0"
      v-bind="keyboardNavigationListeners"
      @keydown.enter="clickOnFocusedDate"
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
import { computed, defineComponent, toRefs, PropType, watch } from 'vue'
import { useVaDatePickerCalendar } from './va-date-picker-calendar-hook'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayIncludeDay, isDatesDayEqual } from '../../utils/date-utils'
import { VaDatePickerModelValue } from '../../types/types'
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
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
  },

  emits: ['update:modelValue', 'hover'],

  setup (props, { emit }) {
    const { modelValue, firstWeekday, weekdayNames, view } = toRefs(props)

    const VaDayPickerCellPropValues = filterComponentProps(props, VaDayPickerCellProps)

    const { calendarDates, currentMonthStartIndex, currentMonthEndIndex } = useVaDatePickerCalendar(view, { firstWeekday })

    const { hovered: hoveredDate } = useHovered<{ date: Date, index: number }>((value) => emit('hover', value?.date))

    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value === 'Sunday'
        ? weekdayNames.value
        : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
    })

    const onDateClick = (date: Date) => {
      const isDateDisabed = props.allowedDays === undefined ? false : !props.allowedDays(date)

      if (isDateDisabed) { return }

      if (isSingleDate(modelValue.value)) {
        emit('update:modelValue', date)
      } else if (isPeriod(modelValue.value)) {
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
        if (isDatesArrayIncludeDay(modelValue.value, date)) {
          emit('update:modelValue', modelValue.value.filter((d) => !isDatesDayEqual(d, date)))
        } else {
          emit('update:modelValue', [...modelValue.value, date].sort((a, b) => a.getTime() - b.getTime()))
        }
      }
    }

    const gridStartIndex = computed(() => props.showOtherMonths ? 0 : currentMonthStartIndex.value)
    const gridEndIndex = computed(() => props.showOtherMonths ? calendarDates.value.length : currentMonthEndIndex.value)

    const {
      focusedCellIndex: focusedDateIndex, listeners: keyboardNavigationListeners,
    } = useGridKeyboardNavigation(7, {
      start: gridStartIndex,
      end: gridEndIndex,
    })

    watch(focusedDateIndex, (newValue) => { hoveredDate.value = { date: calendarDates.value[newValue], index: newValue } })
    watch(hoveredDate, (newValue) => {
      if (newValue === null) {
        focusedDateIndex.value = -1
      } else {
        focusedDateIndex.value = newValue?.index
      }
    })

    const clickOnFocusedDate = () => onDateClick(calendarDates.value[focusedDateIndex.value])

    return {
      hoveredDate,
      calendarDates,
      onDateClick,
      clickOnFocusedDate,
      keyboardNavigationListeners,
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
