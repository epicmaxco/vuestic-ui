<template>
  <div class="va-date-picker-calendar">
    <div class="va-date-picker-calendar__header">
      <va-icon name="chevron_left" size="small" @click="prevMonth" />
      <div class="header-text">{{ headerText }}</div>
      <va-icon name="chevron_right" size="small" @click="nextMonth" />
    </div>

    <div class="va-date-picker-calendar__picker">
      <div class="va-date-picker-calendar__weekdays weekdays">
        <div
          v-for="weekday in weekdayNames" :key="weekday"
          class="weekdays__weekday-cell"
        >
          {{ weekday }}
        </div>
      </div>
      <div class="va-date-picker-calendar__calendar calendar">
        <div class="calendar__day-wrapper" v-for="date in calendarDates" :key="date">
          <div
            class="calendar__day"
            :class="{
              'current-month': currentMonth === date.getMonth(),
              'today': isToday(date),
              'current': isDateCurrentValue(date),
              'in-range': isDateInRange(date),
            }"
            @click="onDateClick(date)"
          >
            {{ date.getDate() }}
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
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'

const isToday = (date: Date): boolean => date.toDateString() === new Date().toDateString()

export default defineComponent({
  name: 'VaDatePickerCalendar',

  props: {
    ...VaDatePickerCalendarProps,
    modelValue: { type: [Date, Array, Object] as PropType<Date | Date[] | { start: Date, end: Date | null }>, required: true },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue, monthNames } = toRefs(props)

    const {
      currentYear, currentMonth, prevMonth, nextMonth, calendarDates,
    } = useVaDatePickerCalendar()

    const headerText = computed(() => `${currentYear.value} ${monthNames.value[currentMonth.value]}`)

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
        // TODO: hovered
        return
      }

      return modelValue.value.start < date && modelValue.value.end > date
    }

    return {
      headerText,
      calendarDates,
      nextMonth,
      prevMonth,
      currentMonth,
      isToday,
      onDateClick,
      isDateCurrentValue,
      isDateInRange,
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
    // TODO: Make it simple
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

      &.current-month {
        color: var(--va-dark);
      }

      &.today {
        &::after {
          position: absolute;
          content: '';
          background-color: var(--va-primary);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.2;
          border-radius: 1px;
        }
      }

      &.current {
        background-color: var(--va-primary);
        color: var(--va-white, white);
      }

      &.in-range {
        &::before {
          position: absolute;
          content: '';
          border: 2px solid var(--va-primary);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 1px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
