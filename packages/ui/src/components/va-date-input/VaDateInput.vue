<template>
  <div class="va-date-input">
    <va-dropdown
      v-model="isOpenSync"
      :offset="[2, 0]"
      :close-on-content-click="false"
      :disabled="disabled"
      anchorSelector=".va-input-wrapper__input"
    >
      <template #anchor>
        <slot name="input" v-bind="{ valueText, inputProps, inputListeners }">
          <va-input
            ref="input"
            class="va-date-input__input"
            v-bind="inputProps"
            v-on="inputListeners"
            :model-value="valueText"
            @change="onInputTextChanged"
          >
            <template
              v-for="name in filterSlots"
              v-slot:[name]="slotScope"
              :key="name"
            >
              <slot :name="name" v-bind="slotScope" />
            </template>

            <template #prependInner="slotScope">
              <slot name="prependInner" v-bind="slotScope" />
              <va-icon
                v-if="$props.leftIcon"
                v-bind="iconProps"
              />
            </template>

            <template #icon>
              <va-icon
                v-if="canBeCleared"
                v-bind="clearIconProps"
                @click.stop="reset()"
              />
              <va-icon
                v-else-if="!$props.leftIcon"
                v-bind="iconProps"
              />
            </template>
          </va-input>
        </slot>
      </template>

      <va-dropdown-content>
        <va-date-picker
            v-bind="datePickerProps"
            v-model="valueComputed"
            @click:day="$emit('click:day', $event)"
            @click:month="$emit('click:month', $event)"
            @click:year="$emit('click:year', $event)"
            @hover:day="$emit('hover:day', $event)"
            @hover:month="$emit('hover:month', $event)"
            @hover:year="$emit('hover:year', $event)"
            @update:view="$emit('update:view', $event)"
        >
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

import { useClearableEmits, useClearable } from '../../composables/useClearable'
import { useValidation, useValidationEmits } from '../../composables/useValidation'
import { useStateful, useStatefulEmits } from '../../composables/useStateful'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { isRange, isSingleDate, isDates } from '../va-date-picker/utils/date-utils'
import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/child-props'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/input-text-parser'
import { parseModelValue } from './hooks/model-value-parser'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import VaDropdown, { VaDropdownContent } from '../va-dropdown'
import VaInput from '../va-input'
import VaIcon from '../va-icon'
import { VaDatePickerModelValue } from '../va-date-picker/types'

const VaInputProps = extractComponentProps(VaInput, [
  'mask', 'returnRaw', 'autosize', 'minRows', 'maxRows', 'type', 'inputmode',
])

export default defineComponent({
  name: 'VaDateInput',

  components: {
    VaDropdown,
    VaDropdownContent,
    VaDatePicker,
    VaInput,
    VaIcon,
  },

  props: {
    ...VaInputProps,
    ...extractComponentProps(VaDatePicker),

    clearValue: { type: Date as PropType<VaDatePickerModelValue>, default: undefined },

    resetOnClose: { type: Boolean, default: true },
    isOpen: { type: Boolean as PropType<boolean | undefined>, default: undefined },

    format: { type: Function as PropType<(date: VaDatePickerModelValue | undefined) => string> },
    formatDate: { type: Function as PropType<(date: Date) => string>, default: (d: Date) => d.toLocaleDateString() },
    parse: { type: Function as PropType<(input: string) => VaDatePickerModelValue> },
    parseDate: { type: Function as PropType<(input: string) => Date> },
    parseValue: { type: Function as PropType<typeof parseModelValue> },

    delimiter: { type: String, default: ', ' },
    rangeDelimiter: { type: String, default: ' ~ ' },
    manualInput: { type: Boolean, default: false },

    color: { type: String, default: 'primary' },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'calendar_today' },
  },

  emits: [
    ...extractComponentEmits(VaDatePicker),
    ...useClearableEmits,
    ...useValidationEmits,
    ...useStatefulEmits,
    'update:is-open',
    'update:text',
  ],

  setup (props, { emit, slots }) {
    const { isOpen, resetOnClose } = toRefs(props)
    const { valueComputed: statefulValue } = useStateful<VaDatePickerModelValue | undefined>(props, emit)
    const { syncProp: isOpenSync } = useSyncProp(isOpen, 'is-open', emit, false)

    const isRangeModelValueGuardDisabled = computed(() => !resetOnClose.value)

    const {
      valueComputed,
      reset: resetInvalidRange,
    } = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled, props.parseValue)

    watch(isOpenSync, (isOpened) => {
      if (!isOpened && !isRangeModelValueGuardDisabled.value) { resetInvalidRange() }
    })

    const dateOrNothing = (date: Date | undefined | null) => date ? props.formatDate(date) : '...'

    const input = ref<typeof VaInput | undefined>()

    const { parseDateInputValue, isValid } = useDateParser(props)

    const modelValueToString = (value: VaDatePickerModelValue): string => {
      if (props.format) {
        return props.format(valueComputed.value)
      }

      if (isDates(value)) {
        return value.map((d) => props.formatDate(d)).join(props.delimiter)
      }
      if (isSingleDate(value)) {
        return props.formatDate(value)
      }
      if (isRange(value)) {
        return dateOrNothing(value.start) + props.rangeDelimiter + dateOrNothing(value.end)
      }

      throw new Error('VaDatePicker: Invalid model value. Value should be Date, Date[] or { start: Date, end: Date | null }')
    }

    const valueText = computed(() => {
      if (!isValid.value) {
        return ''
      }

      if (!valueComputed.value) {
        if (!props.clearValue) { return '' }
        return modelValueToString(props.clearValue)
      }

      return modelValueToString(valueComputed.value)
    })

    const onInputTextChanged = ({ target } : Event) => {
      const parsedValue = parseDateInputValue((target as HTMLInputElement).value)

      if (isValid.value) {
        valueComputed.value = parsedValue
      }
    }

    const reset = (): void => {
      statefulValue.value = props.clearValue
      emit('clear')
    }

    const focus = (): void => {
      input.value?.focus()
    }

    const blur = (): void => {
      input.value?.blur()
    }

    const { computedError, computedErrorMessages, listeners } = useValidation(props, emit, reset, focus)

    const hasError = computed(() => (!isValid.value && valueComputed.value !== props.clearValue) || computedError.value)

    const filterSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && 'prependInner',
        (!props.leftIcon || props.clearable) && 'icon',
      ]
      return Object.keys(slots).filter(slot => !slotsWithIcons.includes(slot))
    })

    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur,
    } = useClearable(props, valueComputed)

    const iconProps = computed(() => ({
      name: props.icon,
      color: props.color,
      size: 'small',
      class: 'va-date-input__icon',
    }))

    const computedInputProps = computed(() => ({
      ...filterComponentProps(props, VaInputProps).value,
      clearable: false,
      rules: [],
      error: hasError.value,
      errorMessages: computedErrorMessages.value,
      readonly: props.readonly || !props.manualInput,
    }))

    const computedInputListeners = computed(() => ({
      focus: () => {
        onFocus()
        listeners.onFocus()
      },
      blur: () => {
        onBlur()
        listeners.onBlur()
      },
    }))

    return {
      valueText,
      valueComputed,
      isOpenSync,
      onInputTextChanged,

      input,
      inputProps: computedInputProps,
      inputListeners: computedInputListeners,
      datePickerProps: filterComponentProps(props, extractComponentProps(VaDatePicker)),

      filterSlots,
      canBeCleared,
      clearIconProps,
      iconProps,

      reset,
      focus,
      blur,
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
