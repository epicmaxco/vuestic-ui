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

    <div class="va-day-picker__calendar">
      <div
        class="va-day-picker__calendar__day-wrapper"
        v-for="date in calendarDates"
        :key="date"
      >
        <va-day-picker-cell
          v-bind="VaDayPickerCellPropValues"
          :date="date"
          :selected-value="modelValue"
          :currentMonth="currentMonth"
          @click="onDateClick"
          @hover="$emit('hover')"
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
import { computed, defineComponent, PropType, toRefs, ref } from 'vue'
import { useVaDatePickerCalendar } from './va-date-picker-calendar-hook'
import { isPeriod, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayInclude, isDatesEqual } from '../../utils/date-utils'
import { VaDatePickerModelValue } from '../../types/types'
import VaDayPickerCell from './VaDayPickerCell.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

const VaDayPickerCellProps = extractComponentProps(VaDayPickerCell, ['date', 'selectedValue'])

export default defineComponent({
  name: 'VaDayPicker',

  components: { VaDayPickerCell },

  props: {
    ...VaDayPickerCellProps,
    monthNames: { type: Array as PropType<string[]>, required: true, default: [] },
    weekdayNames: { type: Array as PropType<string[]>, required: true, default: [] },
    firstWeekday: { type: String as PropType<'Monday' | 'Sunday'>, default: 'Sunday' },
    hideWeekDays: { type: Boolean, default: false },
    year: { type: Number, required: true, default: () => new Date().getFullYear() },
    month: { type: Number, required: true, default: () => new Date().getMonth() },
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
  },

  emits: ['update:modelValue', 'hover'],

  setup (props, { emit }) {
    const { modelValue, firstWeekday, weekdayNames, year, month } = toRefs(props)

    const VaDayPickerCellPropValues = filterComponentProps(props, VaDayPickerCellProps)

    const {
      currentYear, currentMonth, calendarDates,
    } = useVaDatePickerCalendar(year, month, { firstWeekday })

    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value === 'Sunday'
        ? weekdayNames.value
        : [...weekdayNames.value.slice(1), weekdayNames.value[0]]
    })

    const onDateClick = (date: Date) => {
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

    return {
      calendarDates,
      currentYear,
      currentMonth,
      onDateClick,
      weekdayNamesComputed,
      VaDayPickerCellPropValues,
    }
  },
})
</script>

<style lang="scss">
$cell-size: 34px;

.va-day-picker {
  &__weekdays {
    display: flex;

    &__cell {
      width: calc(100% / 7);
      text-align: center;
      font-size: 9px;
      color: var(--va-secondary);
      font-weight: bold;
      height: $cell-size;
      line-height: $cell-size;
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
