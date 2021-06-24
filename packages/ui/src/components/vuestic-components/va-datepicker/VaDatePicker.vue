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
          v-model:year="viewYear"
          v-model:month="viewMonth"
          v-model:view="viewView"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-header>

        <va-date-picker-calendar
          v-if="viewView === 'month'"
          v-model="valueComputed"
          v-bind="calendarProps"
          :year="viewYear"
          :month="viewMonth"
          @hover:day="(value) => $emit('hover:day', value)"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-calendar>

        <va-date-picker-month-calendar
          v-if="viewView === 'year'"
          v-model="valueComputed"
          v-bind="calendarProps"
          :year="viewYear"
          :month="viewMonth"
          :should-update-model-value="valueType === 'month'"
          @hover:month="(value) => $emit('hover:month', value)"
          @click:month="onMonthClick"
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
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'

import { VaDatePickerModelValue, VaDatePickerView, VaDatePickerValueType } from './types/types'
import { isPeriod, isSingleDate, isDates } from './helpers/model-value-helper'
import { useSyncProp } from './hooks/StatefulProp'
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
    view: { type: String as PropType<VaDatePickerView> },
    valueType: { type: String as PropType<VaDatePickerValueType>, default: 'day' },
  },

  emits: ['update:modelValue', 'hover:day', 'hover:month', 'update:year', 'update:month', 'update:view', 'click:month', 'click:day'],

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)
    const { year, month, view, valueType } = toRefs(props)

    const inputProps = filterPropValues(props, VaInputProps)
    const calendarProps = filterPropValues(props, VaDatePickerCalendarProps)
    const headerProps = filterPropValues(props, VaDatePickerHeaderProps)

    const { syncProp: viewYear } = useSyncProp(year, 'year', emit, new Date().getFullYear())
    const { syncProp: viewMonth } = useSyncProp(month, 'month', emit, new Date().getMonth())
    const { syncProp: viewView } = useSyncProp(view, 'view', emit, valueType?.value === 'month' ? 'year' : 'month')

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

    const onMonthClick = ({ year, month, date }: { year: number, month: number, date: Date}) => {
      emit('click:month', { year, month, date })
      if (valueType.value === 'day') {
        viewYear.value = year
        viewMonth.value = month
        viewView.value = 'month'
      }
    }

    return {
      valueText,
      valueComputed,
      slots,
      inputProps,
      calendarProps,
      headerProps,
      viewYear,
      viewMonth,
      viewView,
      onMonthClick,
    }
  },
})
</script>

<style scoped>
.va-date-picker-header {
  padding-bottom: 0.5rem;
}
</style>
