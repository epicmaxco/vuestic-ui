<template>
  <div class="va-date-picker" :style="colorsStyle">
    <va-date-picker-header
      v-bind="headerProps"
      v-model:view="viewView"
      :can-switch-view="canSwitchView"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-date-picker-header>

    <va-day-picker
      v-if="viewView.type === 'month'"
      v-bind="dayPickerProps"
      v-model="valueComputed"
      :view="viewView"
      @hover="(value) => $emit('hover:day', value)"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-day-picker>

    <va-month-picker
      v-if="viewView.type === 'year'"
      v-bind="monthPickerProps"
      v-model="valueComputed"
      :view="viewView"
      :should-update-model-value="valueType === 'month'"
      @hover:month="(value) => $emit('hover:month', value)"
      @click:month="onMonthClick"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-month-picker>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useStateful, statefulComponentOptions } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'
import { useColors } from '../../../services/color-config/color-config'

import { VaDatePickerModelValue, VaDatePickerValueType } from './types/types'
import { isPeriod, isSingleDate, isDates } from './helpers/model-value-helper'
import { useSyncProp } from './hooks/sync-prop'
import { filterComponentProps, extractComponentProps } from './utils/child-props'
import { DatePickerView } from './helpers/date-picker-view'

import VaDayPicker from './components/VaDayPicker/VaDayPicker.vue'
import VaDatePickerHeader from './components/VaDatePickerHeader/VaDatePickerHeader.vue'
import VaMonthPicker from './components/VaMonthPicker/VaMonthPicker.vue'

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export default defineComponent({
  name: 'VaDatePicker',

  components: { VaDayPicker, VaDatePickerHeader, VaMonthPicker },

  props: {
    ...statefulComponentOptions.props,
    ...extractComponentProps(VaDayPicker),
    ...extractComponentProps(VaMonthPicker),
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue>, default: new Date() },
    year: { type: Number },
    month: { type: Number },
    monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: Object as PropType<DatePickerView> },
    valueType: { type: String as PropType<VaDatePickerValueType>, default: 'day' },

    // Colors
    color: { type: String, default: undefined },
    weekendsColor: { type: String, default: undefined },
  },

  emits: [...statefulComponentOptions.emits, 'hover:day', 'hover:month', 'update:year', 'update:month', 'update:view', 'click:month', 'click:day'],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { view, valueType } = toRefs(props)

    const dayPickerProps = filterComponentProps(props, extractComponentProps(VaDayPicker))
    const headerProps = filterComponentProps(props, extractComponentProps(VaDatePickerHeader))
    const monthPickerProps = filterComponentProps(props, extractComponentProps(VaMonthPicker))

    const { syncProp: viewView } = useSyncProp(view, 'view', emit, new DatePickerView(valueType.value === 'month' ? 'year' : 'month'))

    const canSwitchView = computed(() => props.valueType === 'day')

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
      if (valueType.value === 'day' && viewView.value) {
        viewView.value.year = year
        viewView.value.month = month
        viewView.value.type = 'month'
      }
    }

    const { colorsToCSSVariable } = useColors()

    const colorsStyle = colorsToCSSVariable({
      color: props.color,
      'weekends-color': props.weekendsColor,
    }, 'va-date-picker')

    return {
      dayPickerProps,
      headerProps,
      monthPickerProps,

      viewView,

      canSwitchView,

      valueText,
      valueComputed,
      onMonthClick,

      colorsStyle,
    }
  },
})
</script>

<style>
@import './_variables.scss';

.va-date-picker-header {
  padding-bottom: 0.5rem;
  min-width: 250px;
}
</style>
