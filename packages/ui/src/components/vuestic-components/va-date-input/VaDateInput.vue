<template>
  <div class="va-date-input">
    <va-dropdown v-model="isOpenSync" :offset="[0, 10]" :close-on-content-click="false">
      <template #anchor>
        <slot name="input" v-bind="{ valueText, inputProps, color }">
          <va-input
            v-model="valueText"
            v-bind="inputProps"
            class="va-date-input__input"
            @cleared="onClear"
          >
            <template #appendInner="slotScope">
              <slot name="appendInner" v-bind="slotScope">
                <va-icon
                  name="calendar_today"
                  class="va-date-picker__icon"
                  size="small"
                  :color="color"
                />
              </slot>
            </template>

            <template
              v-for="(_, name) in $slots"
              :key="name"
              v-slot:[name]="slotScope"
            >
              <slot :name="name" v-bind="slotScope" />
            </template>
          </va-input>
        </slot>
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
import { computed, defineComponent, PropType, toRefs, watch } from 'vue'
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'

import { isRange, isSingleDate, isDates } from '../va-date-picker/hooks/model-value-helper'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { filterComponentProps, extractComponentProps } from '../va-date-picker/utils/child-props'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import VaInput from '../va-input'
import { VaDatePickerModelValue } from '../va-date-picker/types/types'

const VaInputProps = {
  label: { type: String, required: false },
  color: { type: String, default: 'primary' },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },
  outline: { Boolean, default: false },
  bordered: { Boolean, default: false },
  readonly: { Boolean, default: true },
}

export default defineComponent({
  name: 'VaDateInput',

  components: { VaDatePicker, VaInput },

  props: {
    ...extractComponentProps(VaDatePicker),
    ...VaInputProps,
    resetOnClose: { type: Boolean, default: true },
    isOpen: { type: Boolean },
    format: { type: Function as PropType<(date: VaDatePickerModelValue | undefined) => string> },
  },

  emits: [
    'update:modelValue',
    'hover:day', 'hover:month',
    'update:year', 'update:month', 'update:view',
    'click:month', 'click:day',
    'update:is-open',
    'update:text',
  ],

  setup (props, { emit }) {
    const { isOpen, resetOnClose } = toRefs(props)
    const { valueComputed: statefulValue } = useStateful(props, emit)
    const { syncProp: isOpenSync } = useSyncProp(isOpen, 'is-open', emit, false)

    const isRangeModelValueGuardDisabled = computed(() => !resetOnClose.value)
    const { valueComputed, reset } = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled)
    watch(isOpenSync, (isOpened) => { if (!isOpened && !isRangeModelValueGuardDisabled.value) { reset() } })

    const dateOrNothing = (date: Date | undefined | null) => {
      if (!date) { return '...' }
      return date.toDateString()
    }

    const valueText = computed({
      get: () => {
        if (props.format) {
          return props.format(valueComputed.value)
        }

        if (!valueComputed.value) { return '' }

        if (isDates(valueComputed.value)) {
          return valueComputed.value.map((d) => d.toDateString()).join(', ')
        }
        if (isSingleDate(valueComputed.value)) {
          return valueComputed.value.toDateString()
        }
        if (isRange(valueComputed.value)) {
          return dateOrNothing(valueComputed.value.start) + ' ~ ' + dateOrNothing(valueComputed.value.end)
        }

        throw new Error('VaDatePicker: Invalid model value. Value should be Date, Date[] or { start: Date, end: Date | null }')
      },
      set (value: string) {
        // TODO: Parse value from input
      },
    })

    watch(valueText, (text) => emit('update:text', text))

    const onClear = () => { valueComputed.value = undefined }

    return {
      valueText,
      valueComputed,
      isOpenSync,
      onClear,

      inputProps: filterComponentProps(props, VaInputProps),
      datePickerProps: filterComponentProps(props, extractComponentProps(VaDatePicker)),
    }
  },
})
</script>

<style lang="scss" scoped>
  .va-date-input {
    display: flex;

    &__icon {
      cursor: pointer;
    }

    &__input {
      cursor: pointer;
    }

    --va-date-picker-cell-size: 28px;
  }
</style>
