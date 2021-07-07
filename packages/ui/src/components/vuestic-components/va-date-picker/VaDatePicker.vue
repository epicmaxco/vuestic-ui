<template>
  <div class="va-date-picker" :class="{ 'va-date-picker__without-week-days': hideWeekDays }" :style="colorsStyle">
    <va-date-picker-header
      v-bind="headerProps"
      v-model:view="syncView"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-date-picker-header>

    <va-day-picker
      v-if="syncView.type === 'day'"
      v-bind="dayPickerProps"
      v-model="valueComputed"
      :view="syncView"
      @hover:day="(value) => $emit('hover:day', value)"
      @click:day="(value) => $emit('click:day', value)"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-day-picker>

    <va-month-picker
      v-if="syncView.type === 'month'"
      v-bind="monthPickerProps"
      :view="syncView"
      :model-value="valueComputed"
      @update:model-value="onMonthModelValueUpdate"
      @hover:month="(value) => $emit('hover:month', value)"
      @click:month="onMonthClick"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-month-picker>

    <va-year-picker v-if="syncView.type === 'year'">
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-year-picker>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStateful, statefulComponentOptions } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'
import { useColors } from '../../../services/color-config/color-config'

import { VaDatePickerModelValue, VaDatePickerType, VaDatePickerView } from './types/types'
import { isRange, isSingleDate, isDates } from './helpers/model-value-helper'
import { filterComponentProps, extractComponentProps } from './utils/child-props'
import { useView } from './hooks/view'

import VaDayPicker from './components/VaDayPicker/VaDayPicker.vue'
import VaDatePickerHeader from './components/VaDatePickerHeader/VaDatePickerHeader.vue'
import VaMonthPicker from './components/VaMonthPicker/VaMonthPicker.vue'
import VaYearPicker from './components/VaYearPicker/VaYearPicker.vue'

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export default defineComponent({
  name: 'VaDatePicker',

  components: { VaDayPicker, VaDatePickerHeader, VaMonthPicker, VaYearPicker },

  props: {
    ...statefulComponentOptions.props,
    ...extractComponentProps(VaDayPicker),
    ...extractComponentProps(VaMonthPicker),
    ...extractComponentProps(VaYearPicker),
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    year: { type: Number },
    month: { type: Number },
    monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: Object as PropType<VaDatePickerView> },
    type: { type: String as PropType<VaDatePickerType>, default: 'day' },

    // Colors
    color: { type: String, default: undefined },
    weekendsColor: { type: String, default: undefined },
  },

  emits: [...statefulComponentOptions.emits, 'hover:day', 'hover:month', 'update:year', 'update:month', 'update:view', 'click:month', 'click:day'],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit, undefined)

    const dayPickerProps = filterComponentProps(props, extractComponentProps(VaDayPicker))
    const headerProps = filterComponentProps(props, extractComponentProps(VaDatePickerHeader))
    const monthPickerProps = filterComponentProps(props, extractComponentProps(VaMonthPicker))

    const { syncView } = useView(props, emit, { type: props.type })

    const onMonthClick = ({ year, month, date }: { year: number, month: number, date: Date}) => {
      emit('click:month', { year, month, date })
      if (props.type === 'day') {
        syncView.value = { type: 'day', year, month }
      }
    }

    const onMonthModelValueUpdate = (modelValue: VaDatePickerModelValue) => {
      // Do not update model value if we just want to change view
      if (props.type === 'month') { valueComputed.value = modelValue }
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

      syncView,

      valueComputed,
      onMonthClick,
      onMonthModelValueUpdate,

      colorsStyle,
    }
  },
})
</script>

<style lang="scss">
@import './_variables.scss';

.va-date-picker {
  width: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);

  --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);

  &__without-week-days {
    --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 6 + var(--va-date-picker-cell-gap) * 6);
  }

  .va-day-picker,
  .va-month-picker,
  .va-year-picker {
    height: var(--va-date-picker-content-height);
  }
}

.va-date-picker-header {
  padding-bottom: 0.25rem;
}
</style>
