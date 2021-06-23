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
            :class="{ 'current-month': currentMonth === date.getMonth(), 'today': isToday(date) }"
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
import { getMonthDaysCount, getMonthStartWeekday, getNumbersArray, isToday } from '../../utils/date-utils'

export default defineComponent({
  props: {
    ...VaDatePickerCalendarProps,
    modelValue: { type: [Date, Array, Object] as PropType<Date | Date[] | { start: Date, end: Date }>, required: true },
  },
  setup (props) {
    const CALENDAR_ROWS_COUNT = 6

    const { modelValue, monthNames } = toRefs(props)

    const currentMonth = ref(5)
    const currentYear = ref(2021)

    const nextMonth = () => {
      // If current month is December
      if (currentMonth.value === 11) {
        currentYear.value += 1
        currentMonth.value = 0
      } else {
        currentMonth.value = currentMonth.value + 1
      }
    }
    const prevMonth = () => {
      // If current month is January
      if (currentMonth.value === 0) {
        currentYear.value -= 1
        currentMonth.value = 11 // set current month is December
      } else {
        currentMonth.value = currentMonth.value - 1
      }
    }

    const headerText = computed(() => `${currentYear.value} ${monthNames.value[currentMonth.value]}`)

    const getPreviousDates = () => {
      const currentMonthStartWeekday = getMonthStartWeekday(currentYear.value, currentMonth.value)

      if (currentMonthStartWeekday === 0) { return [] }

      const prevMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value - 1)
      const prevMonthDays: number[] = getNumbersArray(prevMonthDaysCount)

      return prevMonthDays
        .slice(-currentMonthStartWeekday)
        .map((d) => new Date(currentYear.value, currentMonth.value - 1, d))
    }

    const getCurrentDates = () => {
      const currentMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value)
      const currentMonthDays: number[] = getNumbersArray(currentMonthDaysCount)

      return currentMonthDays.map((d) => new Date(currentYear.value, currentMonth.value, d))
    }

    const calendarDates = computed(() => {
      const days = [
        ...getPreviousDates(),
        ...getCurrentDates(),
      ]

      const daysRemaining = 7 * CALENDAR_ROWS_COUNT - days.length

      const nextMonthDaysCount = getMonthDaysCount(currentYear.value, currentMonth.value + 1)
      const nextMonthDays: number[] = getNumbersArray(nextMonthDaysCount)

      return [
        ...days,
        ...nextMonthDays
          .slice(0, daysRemaining)
          .map((d) => new Date(currentYear.value, currentMonth.value + 1, d)),
      ]
    })

    return {
      headerText,
      calendarDates,
      nextMonth,
      prevMonth,
      currentMonth,
      isToday,
    }
  },
})
</script>

<style lang="scss">
$cell-height: 24px;

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
      border-radius: 1px;
      text-align: center;
    }

    &__day {
      color: var(--va-secondary);
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      height: $cell-height;
      line-height: $cell-height;

      &.current-month {
        color: var(--va-dark);
      }

      &.today {
        position: relative;

        &::after {
          position: absolute;
          content: '';
          background-color: var(--va-primary);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          border-radius: 1px;
        }
      }
    }
  }
}
</style>
