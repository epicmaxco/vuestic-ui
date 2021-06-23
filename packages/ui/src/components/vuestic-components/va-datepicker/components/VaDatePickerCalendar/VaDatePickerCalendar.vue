<template>
  <div class="va-date-picker-calendar">
    <div class="va-date-picker-calendar__header">
      <va-icon name="chevron_left" size="small" @click="prevMonth" />
      <div class="header-text">
        <slot name="header-text" v-bind="{ year: currentYear, month: currentMonth, monthNames }">
          <span class="mr-1">
            <slot name="year" v-bind="{ year: currentYear }">{{ currentYear }}</slot>
          </span>

          <slot name="month" v-bind="{ month: currentMonth }">{{ monthNames[currentMonth] }}</slot>
        </slot>
      </div>
      <va-icon name="chevron_right" size="small" @click="nextMonth" />
    </div>

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
import { VaDatePickerCalendarProps } from './VaDatePickerCalendarProps'
import { useVaDatePickerCalendar } from './VaDatePickerCalendarHook'
import { useHovered } from './HoveredOptionHook'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'

const isToday = (date: Date): boolean => date.toDateString() === new Date().toDateString()

export default defineComponent({
  name: 'VaDatePickerCalendar',

  props: {
    ...VaDatePickerCalendarProps,
    modelValue: { type: [Date, Array, Object] as PropType<Date | Date[] | { start: Date, end: Date | null }>, required: true },
  },

  emits: ['update:modelValue', 'hover:day'],

  setup (props, { emit }) {
    const { modelValue, firstWeekday, weekdayNames, allowedDates } = toRefs(props)

    const {
      currentYear, currentMonth, prevMonth, nextMonth, calendarDates,
    } = useVaDatePickerCalendar({ firstWeekday })

    const { hovered: hoveredDate } = useHovered<Date>((value) => emit('hover:day', value))

    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value === 'Sunday'
        ? weekdayNames.value
        : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
    })

    const onDateClick = (date: Date) => {
      if (isSingleDate(modelValue.value)) {
        emit('update:modelValue', date)
      } else if (isPeriod(modelValue.value)) {
        if (isDatesEqual(modelValue.value.start, date) || isDatesEqual(modelValue.value.end, date)) { return }

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

    const isDateWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 5

    return {
      calendarDates,
      nextMonth,
      prevMonth,
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
$cell-height: 34px;

.va-date-picker-calendar {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-text {
      color: var(--va-dark);
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
    }
  }

  &__picker {
    .weekdays {
      display: flex;

      &__weekday-cell {
        width: calc(100% / 7);
        text-align: center;
        font-size: 9px;
        color: var(--va-secondary);
        font-weight: bold;
        height: $cell-height;
        line-height: $cell-height;
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
      height: $cell-height;
      line-height: $cell-height;
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
      }

      &:hover {
        &::after {
          background-color: var(--va-primary);
          opacity: 0.1;
        }
      }

      &.current {
        background-color: var(--va-primary);
        color: var(--va-white, white);
      }

      &.hightlighted-weekend {
        color: var(--va-danger);
      }
    }
  }
}
</style>
