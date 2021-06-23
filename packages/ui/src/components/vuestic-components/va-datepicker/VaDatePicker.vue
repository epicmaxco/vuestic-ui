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
        <va-date-picker-calendar v-model="valueComputed" v-bind="calendarProps" @hover:day="(value) => $emit('hover:day', value)">
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker-calendar>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VaDatePickerCalendar from './components/VaDatePickerCalendar/VaDatePickerCalendar.vue'
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'
import { filterPropValues } from './utils/filter-props-values'
import { VaDatePickerCalendarProps } from './components/VaDatePickerCalendar/VaDatePickerCalendarProps'
import { VaDatePickerModelValue } from './types/types'
import { isPeriod, isSingleDate, isDates } from './helpers/model-value-helper'

const VaInputProps = {
  label: { type: String, required: false },
  color: { type: String, default: 'primary' },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },
  outline: { Boolean, default: false },
  bordered: { Boolean, default: false },
}

export default defineComponent({
  name: 'VaDatePicker',

  props: {
    ...VaInputProps,
    ...VaDatePickerCalendarProps,
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, required: true },
    color: { type: String, default: 'primary' },
  },

  emits: ['update:modelValue', 'hover:day'],

  components: { VaDatePickerCalendar },

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)

    const inputProps = filterPropValues(props, VaInputProps)
    const calendarProps = filterPropValues(props, VaDatePickerCalendarProps)

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
    }
  },
})
</script>
