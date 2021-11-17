<template>
  <div class="va-date-input">
    <va-dropdown v-model="isOpenSync" :offset="[0, 10]" :close-on-content-click="false" :disabled="disabled">
      <template #anchor>
        <slot name="input" v-bind="{ valueText, inputProps, color }">
          <va-input
            v-bind="inputProps"
            ref="input"
            class="va-date-input__input"
            :model-value="valueText"
            :error="!isValid"
            :readonly="readonly || !manualInput"
            @cleared="onClear"
            @change="onInputTextChanged"
          >
            <template #appendInner="slotScope">
              <slot name="appendInner" v-bind="slotScope">
                <va-icon
                  name="calendar_today"
                  class="va-date-input__icon"
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
import { computed, defineComponent, PropType, toRefs, watch, ref } from 'vue'
import { useStateful } from '../../mixins/StatefulMixin/cStatefulMixin'

import { isRange, isSingleDate, isDates } from '../va-date-picker/hooks/model-value-helper'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { filterComponentProps, extractComponentProps } from '../../utils/child-props'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/date-text-parser'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import vaDropdown, { VaDropdownContent } from '../va-dropdown'
import VaInput from '../va-input'
import VaIcon from '../va-icon'
import { VaDatePickerModelValue } from '../va-date-picker/types/types'

const VaInputProps = {
  label: { type: String, required: false },
  color: { type: String, default: 'primary' },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },
  outline: { Boolean, default: false },
  bordered: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
}

export default defineComponent({
  name: 'VaDateInput',

  components: {
    vaDropdown,
    VaDropdownContent,
    VaDatePicker,
    VaInput,
    VaIcon,
  },

  props: {
    ...extractComponentProps(VaDatePicker),
    ...VaInputProps,
    resetOnClose: { type: Boolean, default: true },
    isOpen: { type: Boolean },

    format: { type: Function as PropType<(date: VaDatePickerModelValue | undefined) => string> },
    formatDate: { type: Function as PropType<(date: Date) => string>, default: () => (d: Date) => d.toLocaleDateString() },
    parse: { type: Function as PropType<(input: string) => VaDatePickerModelValue> },
    parseDate: { type: Function as PropType<(input: string) => Date> },

    delimiter: { type: String, default: ', ' },
    rangeDelimiter: { type: String, default: ' ~ ' },
    manualInput: { type: Boolean, default: false },
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

    const dateOrNothing = (date: Date | undefined | null) => date ? props.formatDate(date) : '...'

    const input = ref(0)

    const { parseDateInputValue, isValid } = useDateParser(props)

    const valueText = computed(() => {
      if (!isValid.value) {
        return ''
      }

      if (props.format) {
        return props.format(valueComputed.value)
      }

      if (!valueComputed.value) { return '' }

      if (isDates(valueComputed.value)) {
        return valueComputed.value.map((d) => props.formatDate(d)).join(props.delimiter)
      }
      if (isSingleDate(valueComputed.value)) {
        return props.formatDate(valueComputed.value)
      }
      if (isRange(valueComputed.value)) {
        return dateOrNothing(valueComputed.value.start) + props.rangeDelimiter + dateOrNothing(valueComputed.value.end)
      }

      throw new Error('VaDatePicker: Invalid model value. Value should be Date, Date[] or { start: Date, end: Date | null }')
    })

    const onInputTextChanged = (text: string) => {
      const parsedValue = parseDateInputValue(text)

      if (isValid.value) {
        valueComputed.value = parsedValue
      }
    }

    const onClear = () => { valueComputed.value = undefined }

    return {
      valueText,
      valueComputed,
      isOpenSync,
      isValid,
      onClear,
      onInputTextChanged,

      input,

      inputProps: filterComponentProps(props, VaInputProps),
      datePickerProps: filterComponentProps(props, extractComponentProps(VaDatePicker)),
    }
  },
})
</script>

<style lang="scss">
.va-date-input {
  display: flex;
  font-family: var(--va-font-family);

  &__icon {
    cursor: pointer;
  }

  &__input.va-input_readonly {
    cursor: pointer;
  }

  --va-date-picker-cell-size: 28px;

  .va-dropdown {
    width: 100%;
  }
}
</style>
