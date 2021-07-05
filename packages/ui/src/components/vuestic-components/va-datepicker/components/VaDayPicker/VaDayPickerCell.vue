<template>
  <va-date-picker-cell
    :hidden="isOtherMonth && !showOtherMonths"
    :other-month="isOtherMonth"
    :today="isToday"
    :weekend="isDateWeekend"
    :disabled="isDateDisabled"
    :selected="isDateSelected"
    :in-range="isDateInRange"
    :focused="focused"
    :hightlight-today="hightlightToday"
    :hightlight-weekend="highlightWeekends"
    @click="onDateClick"
  >
    <span class="va-date-picker-cell__day">
      <slot name="day" v-bind="{ date }">
        {{ date.getDate() }}
      </slot>
    </span>
  </va-date-picker-cell>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { VaDatePickerModelValue } from '../../types/types'
import { isRange, isSingleDate, isDates } from '../../helpers/model-value-helper'
import { isDatesArrayIncludeDay, isDatesDayEqual } from '../../utils/date-utils'
import VaDatePickerCell from '../VaDatePickerCell.vue'

export default defineComponent({
  name: 'VaDayPickerCell',

  components: { VaDatePickerCell },

  props: {
    selectedValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    date: { type: Date, required: true },

    // Inherited props
    currentMonth: { type: Number },
    weekends: { type: [Function] as PropType<(d: Date) => boolean> },
    allowedDays: { type: Function as PropType<(date: Date) => boolean> },
    highlightWeekends: { type: Boolean, default: false },
    hightlightToday: { type: Boolean, default: true },
    showOtherMonths: { type: Boolean, default: false },
    focusedDate: { type: Date as PropType<Date | null>, default: null },
    focused: { type: Boolean, default: false },
  },

  emits: ['click', 'hover'],

  setup (props, { emit }) {
    const isOtherMonth = computed(() => props.currentMonth !== props.date.getMonth())
    const isDateDisabled = computed(() => props.allowedDays === undefined ? false : !props.allowedDays(props.date))

    const isDateWeekend = computed(() => {
      if (props.weekends === undefined) {
        return props.date.getDay() === 6 || props.date.getDay() === 0 // 0 - Sunday, 6 - Saturday
      }

      return props.weekends(props.date)
    })

    const isDateSelected = computed(() => {
      if (!props.selectedValue) { return false }

      if (isSingleDate(props.selectedValue)) {
        return props.selectedValue.toDateString() === props.date.toDateString()
      } else if (isDates(props.selectedValue)) {
        return isDatesArrayIncludeDay(props.selectedValue, props.date)
      } else if (isRange(props.selectedValue)) {
        return isDatesDayEqual(props.selectedValue.start, props.date) || isDatesDayEqual(props.selectedValue.end, props.date)
      }

      throw new Error('Unknown modelValue type')
    })

    const isDateInRange = computed(() => {
      if (!props.selectedValue) { return false }
      if (!isRange(props.selectedValue)) { return }

      if (props.selectedValue.end === null) {
        if (!props.focusedDate) { return false }

        return props.selectedValue.start < props.date
          ? (props.focusedDate >= props.date)
          : (props.focusedDate <= props.date)
      }

      return props.selectedValue.start < props.date && props.selectedValue.end > props.date
    })

    const isToday = computed((): boolean => props.date.toDateString() === new Date().toDateString())

    const onDateClick = () => {
      if (isDateDisabled.value) {
        return
      }

      if (isOtherMonth.value && !props.showOtherMonths) {
        return
      }

      emit('click', props.date)
    }

    return {
      isToday,
      isOtherMonth,
      isDateDisabled,
      isDateWeekend,
      isDateSelected,
      isDateInRange,
      onDateClick,
    }
  },
})
</script>
