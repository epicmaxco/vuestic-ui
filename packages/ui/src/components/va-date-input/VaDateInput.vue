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
            :error="hasError"
            :error-messages="computedErrorMessages"
            :readonly="readonly || !manualInput"
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
import { useClearableProps, useClearableEmits, useClearable } from '../../composables/useClearable'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'
import { useFormProps } from '../../composables/useForm'

import { isRange, isSingleDate, isDates } from '../va-date-picker/hooks/model-value-helper'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/child-props'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/date-text-parser'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import vaDropdown, { VaDropdownContent } from '../va-dropdown'
import VaInput from '../va-input'
import VaIcon from '../va-icon'
import { VaDatePickerModelValue } from '../va-date-picker/types/types'

const VaInputProps = {
  ...useValidationProps,
  ...useStatefulProps,
  ...useFormProps,

  label: { type: String, required: false },
  placeholder: { type: String, default: '' },
  tabindex: { type: Number, default: 0 },
  outline: { Boolean, default: false },
  bordered: { type: Boolean, default: false },
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
    ...VaInputProps,
    ...useClearableProps,
    ...extractComponentProps(VaDatePicker),

    clearValue: { type: Date as PropType<VaDatePickerModelValue>, default: undefined },

    resetOnClose: { type: Boolean, default: true },
    isOpen: { type: Boolean },

    format: { type: Function as PropType<(date: VaDatePickerModelValue | undefined) => string> },
    formatDate: { type: Function as PropType<(date: Date) => string>, default: (d: Date) => d.toLocaleDateString() },
    parse: { type: Function as PropType<(input: string) => VaDatePickerModelValue> },
    parseDate: { type: Function as PropType<(input: string) => Date> },

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
    } = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled)

    watch(isOpenSync, (isOpened) => {
      if (!isOpened && !isRangeModelValueGuardDisabled.value) { resetInvalidRange() }
    })

    const dateOrNothing = (date: Date | undefined | null) => date ? props.formatDate(date) : '...'

    const input = ref<typeof VaInput | undefined>()

    const { parseDateInputValue, isValid } = useDateParser(props)

    const valueText = computed(() => {
      if (!isValid.value) {
        return props.clearValue
      }

      if (props.format) {
        return props.format(valueComputed.value)
      }

      if (!valueComputed.value) {
        return props.clearValue
      }

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

    const onInputTextChanged = ({ target } : { target: HTMLInputElement }) => {
      const parsedValue = parseDateInputValue(target.value)

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

    // Will be used later, after fix 'withConfigTransport'
    const blur = (): void => {
      input.value?.blur()
    }

    const {
      isFocused,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, reset, focus)

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
    } = useClearable(props, valueComputed, isFocused, hasError)

    const iconProps = computed(() => ({
      name: props.icon,
      color: props.color,
      size: 'small',
      class: 'va-date-input__icon',
    }))

    const computedInputProps = filterComponentProps(
      props,
      extractComponentProps(VaInput, ['rules', 'error', 'errorMessages', 'clearable']),
    )

    return {
      valueText,
      valueComputed,
      isOpenSync,
      onInputTextChanged,
      hasError,
      computedErrorMessages,

      input,

      inputProps: computedInputProps,
      datePickerProps: filterComponentProps(props, extractComponentProps(VaDatePicker)),

      filterSlots,
      canBeCleared,
      clearIconProps,
      iconProps,
      reset,

      // Will be used later, after fix 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { (this as any).input?.focus() },
    blur () { (this as any).input?.blur() },
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
