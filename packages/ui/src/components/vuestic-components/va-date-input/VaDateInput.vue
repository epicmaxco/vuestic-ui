<template>
  <div class="va-date-picker">
    <va-dropdown v-model="isOpenSync" keep-anchor-width :offset="[0, 10]" :close-on-content-click="false">
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
        <va-date-picker v-bind="datePickerProps" v-model="valueComputed">
          <template v-for="(_, name) in $slots" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'

import { VaDatePickerModelValue, VaDatePickerView, VaDatePickerType } from '../va-date-picker/types/types'
import { isRange, isSingleDate, isDates } from '../va-date-picker/helpers/model-value-helper'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { filterComponentProps, extractComponentProps } from '../va-date-picker/utils/child-props'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

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
  name: 'VaDateInput',

  components: { VaDatePicker },

  props: {
    ...VaInputProps,
    ...extractComponentProps(VaDatePicker),
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    year: { type: Number },
    month: { type: Number },
    monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: String as PropType<VaDatePickerView> },
    valueType: { type: String as PropType<VaDatePickerType>, default: 'day' },
    isOpen: { type: Boolean },
  },

  emits: ['update:modelValue', 'hover:day', 'hover:month', 'update:year', 'update:month', 'update:view', 'click:month', 'click:day', 'update:is-open'],

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)
    const { year, month, view, valueType, isOpen } = toRefs(props)

    const inputProps = filterComponentProps(props, VaInputProps)
    const datePickerProps = filterComponentProps(props, extractComponentProps(VaDatePicker))

    const { syncProp: viewYear } = useSyncProp(year, 'year', emit, new Date().getFullYear())
    const { syncProp: viewMonth } = useSyncProp(month, 'month', emit, new Date().getMonth())
    const { syncProp: viewView } = useSyncProp(view, 'view', emit, valueType?.value === 'month' ? 'year' : 'month')
    const { syncProp: isOpenSync } = useSyncProp(isOpen, 'is-open', emit, false)

    const valueText = computed({
      get: () => {
        if (isDates(valueComputed.value)) {
          return valueComputed.value.map((d) => d.toDateString()).join(', ')
        }
        if (isSingleDate(valueComputed.value)) {
          return valueComputed.value.toDateString()
        }
        if (isRange(valueComputed.value)) {
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
      datePickerProps,
      inputProps,
      viewYear,
      viewMonth,
      viewView,
      isOpenSync,
      onMonthClick,
    }
  },
})
</script>
