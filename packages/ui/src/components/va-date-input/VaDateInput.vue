<template>
  <va-dropdown
    v-model="isOpenSync"
    class="va-date-input"
    :class="$attrs.class"
    :style="$attrs.style"
    v-bind="dropdownPropsComputed"
    @open="focusDatePicker"
  >
    <template #anchor>
      <slot name="input" v-bind="{ valueText, inputAttributes: inputAttributesComputed, inputWrapperProps, inputListeners }">
        <va-input-wrapper
          class="va-date-input__anchor"
          :style="cursorStyleComputed"
          v-bind="inputWrapperProps"
          v-on="inputListeners"
          :model-value="valueText"
          @click.stop="toggleDropdown"
          @change="onInputTextChanged"
        >
          <template
            v-for="name in filterSlots"
            :key="name"
            v-slot:[name]="slotScope"
          >
            <slot :name="name" v-bind="slotScope" />
          </template>

          <template #prependInner="slotScope" v-if="$slots.prependInner || $props.leftIcon">
            <slot name="prependInner" v-bind="slotScope" />
            <va-icon
              v-if="$props.leftIcon"
              :aria-label="tp($props.ariaToggleDropdownLabel)"
              v-bind="iconProps"
              @click.stop="showDropdown"
              @keydown.enter.stop="showDropdown"
              @keydown.space.stop="showDropdown"
            />
          </template>

          <template #icon>
            <va-icon
              v-if="canBeCleared"
              :aria-label="tp($props.ariaResetLabel)"
              v-bind="{ ...iconProps, ...clearIconProps }"
              @click.stop="reset"
              @keydown.enter.stop="reset"
              @keydown.space.stop="reset"
            />
            <va-icon
              v-else-if="!$props.leftIcon && $props.icon"
              :aria-label="tp($props.ariaToggleDropdownLabel)"
              v-bind="iconProps"
              @click.stop="showDropdown"
              @keydown.enter.stop="showDropdown"
              @keydown.space.stop="showDropdown"
            />
          </template>
        </va-input-wrapper>
      </slot>
    </template>

    <va-dropdown-content class="va-date-input__dropdown-content" @keydown.esc="focus()">
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
        @update:view="($event) => { $nextTick(() => trapFocus()); $emit('update:view', $event) }"
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
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRefs,
  watch,
  ref,
  shallowRef,
  nextTick,
  WritableComputedRef,
} from 'vue'
import omit from 'lodash/omit'

import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/component-options'
import {
  useComponentPresetProp,
  useClearable, useClearableEmits, useClearableProps,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useStateful, useStatefulEmits,
  useParsable,
  useDropdownable,
  useDropdownableProps,
  useDropdownableEmits,
  useFocus, useFocusEmits, useTranslation, useFocusDeep, useTrapFocus,
} from '../../composables'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/input-text-parser'
import { parseModelValue } from './hooks/model-value-parser'

import { isRange, isSingleDate, isDates } from '../va-date-picker/utils/date-utils'

import type { DateInputModelValue, DateInputValue } from './types'

import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { unwrapEl } from '../../utils/unwrapEl'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper, ['focused', 'maxLength', 'counterValue'])
const VaDatePickerProps = extractComponentProps(VaDatePicker)
const VaDropdownProps = extractComponentProps(VaDropdown,
  ['innerAnchorSelector', 'stateful', 'keyboardNavigation', 'modelValue', 'trigger'],
)

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
    ...useDropdownableProps,
    ...useClearableProps,
    ...VaInputWrapperProps,
    ...VaDatePickerProps,
    ...useValidationProps as ValidationProps<DateInputModelValue>,
    ...useComponentPresetProp,

    clearValue: { type: Date as PropType<DateInputModelValue>, default: undefined },
    modelValue: { type: [Date, Array, Object, String, Number] as PropType<DateInputModelValue> },

    resetOnClose: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: false },
    offset: { ...useDropdownableProps.offset, default: () => [2, 0] },

    format: { type: Function as PropType<(date: DateInputModelValue) => string> },
    formatDate: { type: Function as PropType<(date: Date) => string>, default: (d: Date) => d.toLocaleDateString() },
    parse: { type: Function as PropType<(input: string) => DateInputValue> },
    parseDate: { type: Function as PropType<(input: string) => Date> },
    parseValue: { type: Function as PropType<typeof parseModelValue> },

    delimiter: { type: String, default: ', ' },
    rangeDelimiter: { type: String, default: ' ~ ' },
    manualInput: { type: Boolean, default: false },

    color: { type: String, default: 'primary' },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'va-calendar' },

    ariaToggleDropdownLabel: { type: String, default: '$t:toggleDropdown' },
    ariaResetLabel: { type: String, default: '$t:resetDate' },
    ariaSelectedDateLabel: { type: String, default: '$t:selectedDate' },
  },

  emits: [
    ...useFocusEmits,
    ...extractComponentEmits(VaDatePicker),
    ...useClearableEmits,
    ...useValidationEmits,
    ...useStatefulEmits,
    ...useDropdownableEmits,
    'update:text',
  ],

  inheritAttrs: false,

  setup (props, { emit, slots, attrs }) {
    const input = shallowRef<HTMLInputElement>()
    const datePicker = ref<typeof VaDatePicker>()

    const { resetOnClose } = toRefs(props)
    const { trapFocusIn, freeFocus } = useTrapFocus()

    const trapFocus = () => {
      const el = unwrapEl(datePicker.value)
      if (!el) {
        freeFocus()
        return
      }

      trapFocusIn(el)
    }

    watch([datePicker], () => {
      trapFocus()
    })

    const { valueComputed: statefulValue }: { valueComputed: WritableComputedRef<DateInputModelValue> } = useStateful(props, emit)
    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => !Array.isArray(statefulValue.value)),
    })

    const { isFocused: isInputFocused, focus, blur, onFocus: focusListener, onBlur: blurListener } = useFocus(input)
    const isPickerFocused = useFocusDeep(datePicker)

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

    const onInputTextChanged = ({ target }: Event) => {
      if (props.disabled) { return }

      const parsedValue = parseDateInputValue((target as HTMLInputElement).value)

      if (isValid.value) {
        valueComputed.value = parsedValue
      }
    }

    const reset = () => withoutValidation(() => {
      statefulValue.value = props.clearValue
      emit('clear')
      resetValidation()
    })

    const hideAndFocus = (): void => {
      isOpenSync.value = false
      focus()
    }

    const focusDatePicker = (): void => {
      nextTick(() => datePicker.value?.focusCurrentPicker())
    }

    const focusInputOrPicker = () => {
      isOpenSync.value ? focusDatePicker() : focus()
    }

    const checkProhibitedDropdownOpening = (e?: KeyboardEvent) => {
      if (isOpenSync.value) { return false }
      if (props.disabled || props.readonly) { return true }
      return props.manualInput && e?.code !== 'Space'
    }

    const toggleDropdown = (event: Event | KeyboardEvent) => {
      if (checkProhibitedDropdownOpening(event instanceof KeyboardEvent ? event : undefined)) { return }

      isOpenSync.value = !isOpenSync.value
      nextTick(focusInputOrPicker)
    }

    // icon interaction
    const showDropdown = () => {
      if (props.disabled || props.readonly) { return }

      isOpenSync.value = true
      nextTick(focusDatePicker)
    }

    const {
      computedError,
      computedErrorMessages,
      listeners,
      validationAriaAttributes,
      withoutValidation,
      resetValidation,
    } = useValidation(props, emit, { reset, focus, value: valueComputed })

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

    const cursorStyleComputed = computed(() => {
      if (props.disabled) { return {} }
      if (props.manualInput) { return { cursor: 'text' } }
      return { cursor: 'pointer' }
    })

    const iconTabindexComputed = computed(() => {
      if (!props.manualInput) { return -1 }

      return props.disabled || props.readonly ? -1 : 0
    })

    const iconProps = computed(() => ({
      role: 'button',
      ariaHidden: false,
      size: 'small',
      name: props.icon,
      color: 'secondary',
      tabindex: iconTabindexComputed.value,
    }))

    const filteredWrapperProps = filterComponentProps(VaInputWrapperProps)
    const computedInputWrapperProps = computed(() => ({
      ...filteredWrapperProps.value,
      focused: isInputFocused.value || isPickerFocused.value,
      error: hasError.value,
      errorMessages: computedErrorMessages.value,
      readonly: props.readonly || !props.manualInput,
    }))

    const computedInputListeners = computed(() => ({
      focus: () => {
        if (props.disabled) { return }

        focusListener()

        if (props.readonly) { return }
        onFocus()
        listeners.onFocus()
      },
      blur: () => {
        if (props.disabled) { return }

        blurListener()

        if (props.readonly) { return }
        onBlur()
        listeners.onBlur()
      },
    }))

    const { tp } = useTranslation()

    const inputAttributesComputed = computed(() => ({
      readonly: props.readonly || !props.manualInput,
      disabled: props.disabled,
      tabindex: props.disabled ? -1 : 0,
      placeholder: props.placeholder,
      value: valueText.value,
      ariaLabel: props.label || tp(props.ariaSelectedDateLabel),
      ariaRequired: props.requiredMark,
      ariaDisabled: props.disabled,
      ariaReadOnly: props.readonly,
      ...validationAriaAttributes.value,
      ...omit(attrs, ['class', 'style']),
    }))

    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      stateful: false,
      closeOnAnchorClick: false,
      keyboardNavigation: true,
      innerAnchorSelector: '.va-input-wrapper__field',
      trigger: 'none' as const,
    }))

    return {
      tp,
      datePicker,
      valueText,
      valueWithoutText,
      valueComputed,
      isOpenSync,
      onInputTextChanged,
      trapFocus,

      isInputFocused,
      isPickerFocused,

      input,
      inputWrapperProps: computedInputWrapperProps,
      inputListeners: computedInputListeners,
      inputAttributesComputed,
      datePickerProps: filterComponentProps(VaDatePickerProps),
      dropdownPropsComputed,

      filterSlots,
      canBeCleared,
      clearIconProps,
      iconProps,
      cursorStyleComputed,

      hideAndFocus,
      toggleDropdown,
      showDropdown,
      focusInputOrPicker,
      focusDatePicker,
      reset,
      focus,
      blur,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";

.va-date-input {
  --va-date-picker-cell-size: 28px;

  font-family: var(--va-font-family);

  &__anchor {
    flex: 1;
  }

  &__input {
    &:read-only {
      cursor: pointer;
    }
  }

  &__dropdown-content {
    display: flex;
    justify-content: center;
  }
}
</style>
