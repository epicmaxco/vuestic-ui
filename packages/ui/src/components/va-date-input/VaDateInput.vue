<template>
  <div class="va-date-input">
    <va-dropdown
      v-model="isOpenSync"
      trigger="none"
      anchorSelector=".va-input-wrapper__field"
      :offset="[2, 0]"
      :close-on-content-click="false"
      :stateful="false"
      :disabled="$props.disabled"
    >
      <template #anchor>
        <slot name="input" v-bind="{ valueText, inputWrapperProps, inputListeners }">
          <va-input-wrapper
            v-bind="inputWrapperProps"
            @click="toggleDropdown"
            @keydown.enter.stop="showAndFocus"
            @keydown.space.stop="showAndFocus"
          >
            <template #default>
              <input
                ref="input"
                class="va-date-input__input"
                v-bind="inputAttributesComputed"
                v-on="inputListeners"
                @change="onInputTextChanged"
              />
            </template>

            <template
              v-for="name in filterSlots"
              :key="name"
              v-slot:[name]="slotScope"
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
                role="button"
                aria-label="reset"
                aria-hiden="false"
                :tabindex="tabindexComputed"
                class="va-date-input__clear-icon"
                v-bind="clearIconProps"
                @click="reset"
                @keydown.enter.stop="reset"
                @keydown.space.stop="reset"
              />
              <va-icon
                v-else-if="!$props.leftIcon"
                :tabindex="tabindexComputed"
                v-bind="iconProps"
                @click.stop="showDropdown"
                @keydown.enter.stop="showDropdown"
                @keydown.space.stop="showDropdown"
              />
            </template>
          </va-input-wrapper>
        </slot>
      </template>

      <va-dropdown-content
        @keydown.esc.stop.prevent="hideAndFocus"
      >
        <va-date-picker
            ref="datePicker"
            v-bind="datePickerProps"
            v-model="valueWithoutText"
            @click:day="$emit('click:day', $event)"
            @click:month="$emit('click:month', $event)"
            @click:year="$emit('click:year', $event)"
            @hover:day="$emit('hover:day', $event)"
            @hover:month="$emit('hover:month', $event)"
            @hover:year="$emit('hover:year', $event)"
            @update:view="$emit('update:view', $event)"
        >
          <template
            v-for="(_, name) in $slots"
            :key="name"
            v-slot:[name]="bind"
          >
            <slot :name="name" v-bind="bind" />
          </template>
        </va-date-picker>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, watch, ref, shallowRef, nextTick } from 'vue'

import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/child-props'
import {
  useClearable, useClearableEmits,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useStateful, useStatefulEmits,
  useParsable,
  useFocus,
} from '../../composables'
import { useSyncProp } from '../va-date-picker/hooks/sync-prop'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/input-text-parser'
import { parseModelValue } from './hooks/model-value-parser'

import { isRange, isSingleDate, isDates } from '../va-date-picker/utils/date-utils'

import { DateInputModelValue, DateInputValue } from './types'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaInputWrapper } from '../va-input'
import { VaIcon } from '../va-icon'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper, ['focused', 'maxLength', 'counterValue'])
const VaDatePickerProps = extractComponentProps(VaDatePicker)

export default defineComponent({
  name: 'VaDateInput',

  components: {
    VaDropdown,
    VaDropdownContent,
    VaDatePicker,
    VaInputWrapper,
    VaIcon,
  },

  props: {
    ...VaInputWrapperProps,
    ...VaDatePickerProps,
    ...useValidationProps as ValidationProps<DateInputModelValue>,

    clearValue: { type: Date as PropType<DateInputModelValue>, default: undefined },
    modelValue: { type: [Date, Array, Object, String, Number] as PropType<DateInputModelValue> },

    resetOnClose: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: undefined },

    format: { type: Function as PropType<(date: DateInputModelValue) => string> },
    formatDate: { type: Function as PropType<(date: Date) => string>, default: (d: Date) => d.toLocaleDateString() },
    parse: { type: Function as PropType<(input: string) => DateInputValue> },
    parseDate: { type: Function as PropType<(input: string) => Date> },
    parseValue: { type: Function as PropType<typeof parseModelValue> },

    delimiter: { type: String, default: ', ' },
    rangeDelimiter: { type: String, default: ' ~ ' },
    manualInput: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },

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
    const input = shallowRef<HTMLInputElement>()
    const datePicker = ref<typeof VaDatePicker>()

    const { isOpen, resetOnClose } = toRefs(props)
    const { valueComputed: statefulValue } = useStateful<DateInputModelValue>(props, emit)
    const { syncProp: isOpenSync } = useSyncProp(isOpen, 'is-open', emit, false)

    const { isFocused, focus, blur, onFocus: focusListener, onBlur: blurListener } = useFocus(input)

    const isRangeModelValueGuardDisabled = computed(() => !resetOnClose.value)

    const {
      valueComputed,
      reset: resetInvalidRange,
    } = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled, props.parseValue)

    watch(isOpenSync, (isOpened) => {
      if (!isOpened && !isRangeModelValueGuardDisabled.value) { resetInvalidRange() }
    })

    const dateOrNothing = (date: Date | undefined | null) => date ? props.formatDate(date) : '...'

    const { parseDateInputValue, isValid } = useDateParser(props)

    watch(valueComputed, () => {
      isValid.value = true
    })

    const modelValueToString = (value: DateInputModelValue): string => {
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

    const {
      text,
      value: valueWithoutText,
    } = useParsable(valueComputed, parseDateInputValue, modelValueToString)

    const valueText = computed(() => {
      if (!isValid.value) {
        return ''
      }

      if (!valueComputed.value) {
        if (!props.clearValue) { return '' }
        return modelValueToString(props.clearValue)
      }

      return text.value
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

    const hideAndFocus = (): void => {
      isOpenSync.value = false
      focus()
    }

    const focusDatePicker = (): void => {
      nextTick(() => datePicker.value?.focusCurrentPicker())
    }

    const focusInputOrPicker = (): void => {
      isOpenSync.value ? focusDatePicker() : focus()
    }

    const showDropdown = () => {
      isOpenSync.value = true
      nextTick(focusInputOrPicker)
    }

    const toggleDropdown = () => {
      if (props.manualInput) { return }

      isOpenSync.value = !isOpenSync.value
      nextTick(focusInputOrPicker)
    }

    const showAndFocus = (event: Event): void => {
      if (props.manualInput) { return }

      isOpenSync.value = true
      focusDatePicker()
      event.preventDefault()
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

    const tabindexComputed = computed(() => props.disabled ? -1 : 0)

    const computedInputWrapperProps = computed(() => ({
      ...filterComponentProps(props, VaInputWrapperProps).value,
      focused: isFocused.value,
      clearable: false,
      rules: [],
      error: hasError.value,
      errorMessages: computedErrorMessages.value,
      readonly: props.readonly || !props.manualInput,
    }))

    const computedInputListeners = computed(() => ({
      focus: () => {
        if (props.disabled) { return }

        onFocus()
        focusListener()
        listeners.onFocus()
      },
      blur: () => {
        if (props.disabled) { return }

        onBlur()
        blurListener()
        listeners.onBlur()
      },
    }))

    const inputAttributesComputed = computed(() => ({
      value: valueText.value,
      ariaLabel: props.label || 'selected date',
      ariaRequired: props.requiredMark,
      ariaDisabled: props.disabled,
      ariaReadOnly: props.readonly,
      'aria-invalid': !!computedErrorMessages.value.length,
      'aria-errormessage': typeof computedErrorMessages.value === 'string'
        ? computedErrorMessages.value
        : computedErrorMessages.value.join(', '),
      readonly: props.readonly || !props.manualInput,
      tabindex: tabindexComputed.value,
    }))

    return {
      datePicker,
      valueText,
      valueWithoutText,
      valueComputed,
      isOpenSync,
      onInputTextChanged,

      isFocused,

      input,
      inputWrapperProps: computedInputWrapperProps,
      inputListeners: computedInputListeners,
      inputAttributesComputed,
      datePickerProps: filterComponentProps(props, extractComponentProps(VaDatePicker)),

      filterSlots,
      canBeCleared,
      clearIconProps,
      iconProps,

      hideAndFocus,
      showAndFocus,
      toggleDropdown,
      showDropdown,
      focusInputOrPicker,
      reset,
      focus,
      blur,
      tabindexComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";

.va-date-input {
  --va-date-picker-cell-size: 28px;

  display: flex;
  font-family: var(--va-font-family);

  &__icon {
    cursor: pointer;
  }

  &__clear-icon {
    &:focus {
      @include focus-outline;
    }
  }

  &__input {
    &:read-only {
      cursor: pointer;
    }
  }

  .va-dropdown {
    width: 100%;
  }
}
</style>
