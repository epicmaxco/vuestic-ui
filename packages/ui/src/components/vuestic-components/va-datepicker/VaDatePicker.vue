<template>
  <div class="va-date-picker">
    <va-dropdown keep-anchor-width :offset="[0, 10]" :close-on-content-click="false">
      <template #anchor>
        <va-input
          v-model="valueText"
          v-bind="inputProps"
        >
          <template
            v-for="slot in ['append', 'prepend', 'prependInner', 'appendInner']"
            :key="slot"
            v-slot:[slot]="slotScope"
          >
            <slot v-if="slot === 'appendInner'" :name="slot" v-bind="slotScope">
              <va-icon name="calendar_today" size="small" :color="color" />
            </slot>
            <slot v-else :name="slot" v-bind="slotScope" />
          </template>
        </va-input>
      </template>

      <va-dropdown-content>
        <va-date-picker-header
          v-bind="headerProps"
          :year="statefulYear"
          :month="statefulMonth"
          @next="nextMonth"
          @prev="prevMonth"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-header>

        <va-date-picker-calendar
          v-if="view === 'month'"
          v-model="valueComputed"
          v-bind="calendarProps"
          :year="statefulYear"
          :month="statefulMonth"
          @hover:day="(value) => $emit('hover:day', value)"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-calendar>

        <va-date-picker-month-calendar
          v-if="view === 'year'"
          v-model="valueComputed"
          v-bind="calendarProps"
          :year="statefulYear"
          :month="statefulMonth"
          @hover:month="(value) => $emit('hover:month', value)"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-month-calendar>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'

import { VaDatePickerModelValue, VaDatePickerView } from './types/types'
import { isPeriod, isSingleDate, isDates } from './helpers/model-value-helper'
import { useVaDatePickerViewControls } from './hooks/VaDatePickerViewControls'
import { filterPropValues } from './utils/filter-props-values'

import VaDatePickerCalendar from './components/VaDatePickerCalendar/VaDatePickerCalendar.vue'
import { VaDatePickerCalendarProps } from './components/VaDatePickerCalendar/VaDatePickerCalendarProps'

import VaDatePickerHeader from './components/VaDatePickerHeader/VaDatePickerHeader.vue'
import { VaDatePickerHeaderProps } from './components/VaDatePickerHeader/VaDatePickerHeaderProps'

import VaDatePickerMonthCalendar from './components/VaDatePickerMonthCalendar/VaDatePickerMonthCalendar.vue'

const VaInputProps = {
  label: { type: String, required: false },
  color: { type: String, default: 'primary' },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },
  outline: { Boolean, default: false },
  bordered: { Boolean, default: false },
}

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export default defineComponent({
  name: 'VaDatePicker',

  components: { VaDatePickerCalendar, VaDatePickerHeader, VaDatePickerMonthCalendar },

  props: {
    ...VaInputProps,
    ...VaDatePickerCalendarProps,
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
    color: { type: String, default: 'primary' },
    year: { type: Number },
    month: { type: Number },
    monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: String as PropType<VaDatePickerView>, default: 'month' },
  },

  emits: ['update:modelValue', 'hover:day', 'hover:month', 'update:year', 'update:month'],

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)

    const inputProps = filterPropValues(props, VaInputProps)
    const calendarProps = filterPropValues(props, VaDatePickerCalendarProps)
    const headerProps = filterPropValues(props, VaDatePickerHeaderProps)

    const valueText = computed({
      get: () => {
        if (isDates(valueComputed.value)) {
          return valueComputed.value.map((d) => d.toDateString()).join(', ')
        }
        if (isSingleDate(valueComputed.value)) {
          return valueComputed.value.toDateString()
        }
        if (isPeriod(valueComputed.value)) {
          if (valueComputed.value.end === null) {
            return valueComputed.value.start.toDateString() + ' ~ ...'
          }

          return valueComputed.value.start.toDateString() + ' ~ ' + valueComputed.value.end.toDateString()
        }

        throw new Error('VaDatePicker: Invalid model value. Value should be Date, Date[] or { start: Date, end: Date | null }')
      },
      set (value: string) {
        // TODO: Parse value from input
      },
    })

    return {
      valueText,
      valueComputed,
      slots,
      inputProps,
      calendarProps,
      headerProps,
      ...useVaDatePickerViewControls(props, emit),
    }
  },
})
</script>

<style scoped>
.va-date-picker-header {
  padding-bottom: 0.5rem;
}
</style>
