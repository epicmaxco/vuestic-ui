<template>
  <div class="va-date-picker-calendar">
    <div class="va-date-picker-calendar__picker">
      <div class="va-date-picker-calendar__weekdays weekdays" v-if="!hideWeekDays">
        <div
          v-for="weekday in weekdayNamesComputed" :key="weekday"
          class="weekdays__weekday-cell"
        >
          <slot name="weekday">
            {{ weekday }}
          </slot>
        </div>
      </div>

      <div class="va-date-picker-calendar__calendar calendar">
        <div
          class="calendar__day-wrapper"
          v-for="date in calendarDates"
          :key="date"
          @mouseenter="hoveredDate = date"
          @mouseleave="hoveredDate = null"
        >
          <div
            class="calendar__day"
            :class="{
              'current-month': currentMonth === date.getMonth(),
              'today': highlightTodayDate && isToday(date),
              'current': isDateCurrentValue(date),
              'in-range': isDateInRange(date),
              'not-allowed': isDateNotAllowed(date),
              'hightlighted-weekend': highlightWeekends && isDateWeekend(date)
            }"
            @click="onDateClick(date)"
          >
            <slot name="day" v-bind="{ date }">
              {{ date.getDate() }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, ref } from 'vue'
import { useVaDatePickerCalendar } from './VaDatePickerCalendarHook'
import { useHovered } from '../../hooks/HoveredOptionHook'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'
import { VaDatePickerModelValue } from '../../types/types'

const isToday = (date: Date): boolean => date.toDateString() === new Date().toDateString()

export default defineComponent({
  name: 'VaDayPicker',

  props: {
    monthNames: { type: Array as PropType<string[]>, required: true, default: [] },
    weekdayNames: { type: Array as PropType<string[]>, required: true, default: [] },
    firstWeekday: { type: String as PropType<'Monday' | 'Sunday'>, default: 'Sunday' },
    allowedDates: { type: Function as PropType<(date: Date) => boolean>, required: false },
    highlightTodayDate: { type: Boolean, default: true },
    highlightWeekends: { type: Boolean, default: false },
    weekends: { type: [Function] as PropType<(d: Date) => boolean>, default: undefined },
    hideWeekDays: { type: Boolean, default: false },
    year: { type: Number, required: true, default: () => new Date().getFullYear() },
    month: { type: Number, required: true, default: () => new Date().getMonth() },
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
  },

  emits: ['update:modelValue', 'hover:day'],

  setup (props, { emit }) {
    const { modelValue, firstWeekday, weekdayNames, allowedDates, year, month, weekends } = toRefs(props)

    const {
      currentYear, currentMonth, calendarDates,
    } = useVaDatePickerCalendar(year, month, { firstWeekday })

    const { hovered: hoveredDate } = useHovered<Date>((value) => emit('hover:day', value))

    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value === 'Sunday'
        ? weekdayNames.value
        : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
    })

    const onDateClick = (date: Date) => {
      if (isDateNotAllowed(date)) { return }

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
        if (isDatesArrayInclude(modelValue.value, date)) {
          emit('update:modelValue', modelValue.value.filter((d) => !isDatesEqual(d, date)))
        } else {
          emit('update:modelValue', [...modelValue.value, date].sort((a, b) => a.getTime() - b.getTime()))
        }
      }
    }

    const isDateCurrentValue = (date: Date) => {
      if (isSingleDate(modelValue.value)) {
        return modelValue.value.toDateString() === date.toDateString()
      } else if (isDates(modelValue.value)) {
        return isDatesArrayInclude(modelValue.value, date)
      } else if (isPeriod(modelValue.value)) {
        return isDatesEqual(modelValue.value.start, date) || isDatesEqual(modelValue.value.end, date)
      }
    }

    const isDateInRange = (date: Date) => {
      if (!isPeriod(modelValue.value)) { return }

      if (modelValue.value.end === null) {
        return modelValue.value.start < date
          ? (hoveredDate.value && hoveredDate.value >= date)
          : (hoveredDate.value && hoveredDate.value <= date)
      }

      return modelValue.value.start < date && modelValue.value.end > date
    }

    const isDateNotAllowed = (date: Date) => allowedDates?.value === undefined ? false : !allowedDates.value(date)

    const isDateWeekend = (date: Date) => {
      if (weekends.value === undefined) {
        return date.getDay() === 6 || date.getDay() === 0 // 0 - Sunday, 6 - Saturday
      }

      return weekends.value(date)
    }

    return {
      calendarDates,
      currentYear,
      currentMonth,
      isToday,
      onDateClick,
      isDateCurrentValue,
      isDateInRange,
      isDateNotAllowed,
      isDateWeekend,
      hoveredDate,
      weekdayNamesComputed,
    }
  },
})
</script>

<style lang="scss">
$cell-size: 34px;

.va-date-picker-calendar {
  &__picker {
    .weekdays {
      display: flex;

      &__weekday-cell {
        width: calc(100% / 7);
        text-align: center;
        font-size: 9px;
        color: var(--va-secondary);
        font-weight: bold;
        height: $cell-size;
        line-height: $cell-size;
      }
    }
  }

  .calendar {
    display: grid;
    // 7 columns
    grid-template-columns: (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7) (100% / 7);

    &__day-wrapper {
      padding: 1px;
      border-radius: 6px;
      text-align: center;
      user-select: none;
      cursor: pointer;
      overflow: hidden;
    }

    &__day {
      color: var(--va-secondary);
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      height: $cell-size;
      min-width: $cell-size;
      line-height: $cell-size;
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

      &.current-month {
        color: var(--va-dark);
      }

      &.today {
        &::after {
          background-color: var(--va-primary);
          opacity: 0.3;
        }
      }

      &.in-range {
        &::before {
          content: '';
          border: 2px solid var(--va-primary);
          box-sizing: border-box;
          opacity: 0.7;
        }
      }

      &.not-allowed {
        color: var(--va-warning);
        cursor: default;

        &:hover {
          &::after {
            display: none;
          }
        }
      }

      &:hover {
        &::after {
          background-color: var(--va-primary);
          opacity: 0.1;
        }
      }

      &.hightlighted-weekend {
        color: var(--va-danger);
      }

      &.current {
        background-color: var(--va-primary);
        color: var(--va-white, white);
      }
    }
  }
}
</style>
