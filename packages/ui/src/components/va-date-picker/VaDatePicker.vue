<template>
  <div class="va-date-picker" :class="classComputed" :style="styleComputed">
    <va-date-picker-header
      v-bind="headerProps"
      v-model:view="syncView"
    >
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-date-picker-header>

    <div class="va-date-picker__picker-wrapper">
      <va-day-picker
        v-if="syncView.type === 'day'"
        ref="currentPicker"
        v-bind="dayPickerProps"
        :model-value="valueComputed"
        :view="syncView"
        :readonly="$props.disabled || isPickerReadonly('day')"
        @update:model-value="onDayModelValueUpdate"
        @hover:day="(value) => $emit('hover:day', value)"
        @click:day="(value) => $emit('click:day', value)"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-day-picker>

      <va-month-picker
        v-if="syncView.type === 'month'"
        ref="currentPicker"
        v-bind="monthPickerProps"
        :view="syncView"
        :model-value="valueComputed"
        :readonly="$props.disabled || isPickerReadonly('month')"
        @update:model-value="onMonthModelValueUpdate"
        @hover:month="(value) => $emit('hover:month', value)"
        @click:month="onMonthClick"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-month-picker>

      <va-year-picker
        v-if="syncView.type === 'year'"
        ref="currentPicker"
        v-bind="yearPickerProps"
        :view="syncView"
        :model-value="valueComputed"
        :readonly="$props.disabled || isPickerReadonly('year')"
        @hover:year="(value) => $emit('hover:year', value)"
        @update:model-value="onYearModelValueUpdate"
        @click:year="onYearClick"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-year-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { VaButton } from '../'
import { computed, nextTick, PropType, ref, watch } from 'vue'

import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/component-options'
import { useColors, useStateful, useStatefulProps, useStatefulEmits, useComponentPresetProp, defineChildProps, useChildComponents, ColorName } from '../../composables'
import { useView } from './hooks/view'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

import { DatePickerModelValue, DatePickerType, DatePickerViewProp } from './types'

import VaDayPicker from './components/VaDayPicker/VaDayPicker.vue'
import VaDatePickerHeader from './components/VaDatePickerHeader/VaDatePickerHeader.vue'
import VaMonthPicker from './components/VaMonthPicker/VaMonthPicker.vue'
import VaYearPicker from './components/VaYearPicker/VaYearPicker.vue'

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaDatePicker',
})

const props = defineProps({
  ...defineChildProps({
    prevButton: VaButton,
    nextButton: VaButton,
    middleButton: VaButton,
  }),
  ...useStatefulProps,
  ...useComponentPresetProp,
  ...extractComponentProps(VaDatePickerHeader),
  ...extractComponentProps(VaDayPicker),
  ...extractComponentProps(VaMonthPicker),
  ...extractComponentProps(VaYearPicker),
  modelValue: { type: [Date, Array, Object] as PropType<DatePickerModelValue> },
  monthNames: { type: Array as PropType<string[]>, default: DEFAULT_MONTH_NAMES },
  weekdayNames: { type: Array as PropType<string[]>, default: DEFAULT_WEEKDAY_NAMES },
  view: { type: Object as PropType<DatePickerViewProp> },
  type: { type: String as PropType<DatePickerType>, default: 'day' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },

    // Colors
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: undefined },
  weekendsColor: { type: String, default: undefined },
})

useChildComponents(props)

const emit = defineEmits([
  ...useStatefulEmits,
  ...extractComponentEmits(VaDatePickerHeader),
  ...extractComponentEmits(VaYearPicker),
  ...extractComponentEmits(VaDayPicker),
  ...extractComponentEmits(VaMonthPicker),
])

const currentPicker = ref<typeof VaDayPicker | typeof VaMonthPicker | typeof VaYearPicker>()

const valueComputed = useStateful(props, emit)

const { syncView } = useView(props, emit, { type: props.type })

const classComputed = computed(() => ({
  'va-date-picker_without-week-days': props.hideWeekDays,
  'va-date-picker_disabled': props.disabled,
}))

const onDayModelValueUpdate = (modelValue: DatePickerModelValue) => {
  if (props.readonly) { return }

  // Do not update model value if we just want to change view (We can change it for now, but later we can add here timepicker)
  if (props.type === 'day') { valueComputed.value = modelValue }
}

const onMonthClick = (date: Date) => {
  emit('click:month', date)
  const year = date.getFullYear()
  const month = date.getMonth()
  if (props.type !== 'month') {
    syncView.value = { type: 'day', year, month }
  }
}

const onMonthModelValueUpdate = (modelValue: DatePickerModelValue) => {
  // Do not update model value if we just want to change view
  if (props.type === 'month') { valueComputed.value = modelValue }
}

const onYearClick = (date : Date) => {
  emit('click:year', date)

  const year = date.getFullYear()

  if (props.type !== 'year') {
    syncView.value = { type: 'month', year, month: syncView.value.month }
  }
}

const onYearModelValueUpdate = (modelValue: DatePickerModelValue) => {
  // Do not update model value if we just want to change view
  if (props.type === 'year') { valueComputed.value = modelValue }
}

const { colorsToCSSVariable } = useColors()

const styleComputed = computed(() => ({
  ...colorsToCSSVariable({
    color: props.color,
    'weekends-color': props.weekendsColor,
  }, 'va-date-picker'),
}))

const focusCurrentPicker = () => currentPicker.value?.$el.focus()

watch(syncView, (newValue, prevValue) => {
  // Don't focus new picker if user does not change type
  if (newValue.type === prevValue.type) { return }

  nextTick(focusCurrentPicker)
})

const isPickerReadonly = (pickerName: 'year' | 'month' | 'day') => {
  return props.readonly && props.type === pickerName
}

const dayPickerProps = filterComponentProps(extractComponentProps(VaDayPicker))
const headerProps = filterComponentProps(extractComponentProps(VaDatePickerHeader))
const monthPickerProps = filterComponentProps(extractComponentProps(VaMonthPicker))
const yearPickerProps = filterComponentProps(extractComponentProps(VaYearPicker))

defineExpose({
  focus: focusCurrentPicker,
  focusCurrentPicker,
})
</script>

<style lang="scss">
@import 'variables';

.va-date-picker {
  --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);

  width: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);
  font-family: var(--va-font-family);
  font-style: var(--va-date-picker-font-style);
  font-weight: var(--va-date-picker-font-weight);
  font-size: var(--va-date-picker-font-size);
  line-height: var(--va-date-picker-line-height);
  color: currentColor;

  &__picker-wrapper {
    height: var(--va-date-picker-content-height);
  }

  &_without-week-days {
    --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 6 + var(--va-date-picker-cell-gap) * 6);
  }

  &_mobile {
    .va-day-picker,
    .va-month-picker,
    .va-year-picker {
      height: 100%;
    }
  }

  &_disabled {
    opacity: 0.4;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 100;
    }
  }
}

.va-date-picker-header {
  padding-bottom: 0.25rem;
}
</style>
