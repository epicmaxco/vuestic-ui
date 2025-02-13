<template>
  <va-dropdown
    v-model="isOpenSync"
    class="va-date-input"
    :class="$attrs.class"
    :style="$attrs.style"
    v-bind="dropdownPropsComputed"
    @open="focusDatePicker"
    role="none"
  >
    <template #anchor>
      <slot name="input" v-bind="{ valueText, inputAttributes: inputAttributesComputed, inputWrapperProps }">
        <va-input-wrapper
          class="va-date-input__anchor"
          :style="cursorStyleComputed"
          v-bind="inputWrapperProps"
          :model-value="valueText"
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
              v-if="!$props.leftIcon && $props.icon"
              :aria-label="tp($props.ariaToggleDropdownLabel)"
              v-bind="iconProps"
            />
          </template>
        </va-input-wrapper>
      </slot>
    </template>

    <va-dropdown-content class="va-date-input__dropdown-content" @keydown.esc="focus()" role="dialog">
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
import { computed, PropType, toRef, toRefs, watch, ref, shallowRef, nextTick, Ref, useAttrs, useSlots } from 'vue'

import { filterComponentProps, extractComponentProps, extractComponentEmits } from '../../utils/component-options'
import {
  useComponentPresetProp,
  useClearableControl, useClearableControlEmits, useClearableControlProps,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useStateful, useStatefulEmits,
  useDropdownableControl,
  useDropdownableControlProps,
  useDropdownableControlEmits,
  useFocusableControl, useFocusableControlProps, useFocusableControlEmits,
  useTranslation, useTranslationProp, useElementFocusedWithin, useTrapFocus,
} from '../../composables'
import { useRangeModelValueGuard } from './hooks/range-model-value-guard'
import { useDateParser } from './hooks/input-text-parser'
import { useDateInputModelValue } from './hooks/model-value'

import { isRange, isSingleDate, isDates } from '../va-date-picker/utils/date-utils'

import type { DateInputModelValue, DateInputValue } from './types'

import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import VaDatePicker from '../va-date-picker/VaDatePicker.vue'
import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { unwrapEl } from '../../utils/unwrapEl'
import { omit } from '../../utils/omit'

const VaInputWrapperPropsDeclaration = extractComponentProps(VaInputWrapper, ['focused', 'maxLength', 'counterValue'])
const VaDatePickerPropsDeclaration = extractComponentProps(VaDatePicker)
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaDateInput',
})

const props = defineProps({
  ...useDropdownableControlProps,
  ...useClearableControlProps,
  ...VaInputWrapperPropsDeclaration,
  ...VaDatePickerPropsDeclaration,
  ...useValidationProps as ValidationProps<DateInputModelValue>,
  ...useComponentPresetProp,
  ...useFocusableControlProps,

  clearValue: { type: undefined as unknown as PropType<any>, default: undefined },
  modelValue: { type: [Date, Array, Object, String, Number] as PropType<DateInputModelValue> },

  resetOnClose: { type: Boolean, default: true },
  closeOnContentClick: { type: Boolean, default: false },
  offset: { ...useDropdownableControlProps.offset, default: () => [2, 0] },

  format: { type: Function as PropType<(date: DateInputModelValue) => string> },
  formatDate: { type: Function as PropType<(date: Date) => string>, default: (d: Date) => d.toLocaleDateString() },
  /** Force model value to string instead of date */
  formatValue: { type: Function as PropType<(date: DateInputModelValue) => string> },
  parse: { type: Function as PropType<(input: string) => DateInputValue> },
  parseDate: { type: Function as PropType<(input: string) => Date> },

  delimiter: { type: String, default: ', ' },
  rangeDelimiter: { type: String, default: ' ~ ' },
  manualInput: { type: Boolean, default: false },

  color: { type: String, default: 'primary' },
  leftIcon: { type: Boolean, default: false },
  icon: { type: String, default: 'va-calendar' },

  ariaToggleDropdownLabel: useTranslationProp('$t:toggleDropdown'),
  ariaResetLabel: useTranslationProp('$t:resetDate'),
  ariaSelectedDateLabel: useTranslationProp('$t:selectedDate'),
})

const emit = defineEmits([
  ...extractComponentEmits(VaDatePicker),
  ...useClearableControlEmits,
  ...useValidationEmits,
  ...useStatefulEmits,
  ...useDropdownableControlEmits,
  ...useFocusableControlEmits,
  'update:text',
])

const input = shallowRef<HTMLInputElement>()
const datePicker = ref<InstanceType<typeof VaDatePicker>>()

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

const statefulValue = useStateful(props, emit)
const { isOpenSync, dropdownProps } = useDropdownableControl(props, emit, {
  defaultCloseOnValueUpdate: computed(() => {
    if (Array.isArray(valueComputed.value)) {
      return false
    }

    if (isRange(valueComputed.value) && valueComputed.value.end === null) {
      return false
    }

    return true
  }),
})

const isRangeModelValueGuardDisabled = computed(() => !resetOnClose.value)

const {
  valueComputed,
  reset: resetInvalidRange,
} = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled)

watch(isOpenSync, (isOpened) => {
  if (!isOpened && !isRangeModelValueGuardDisabled.value) { resetInvalidRange() }
})

const { focus, blur } = useFocusableControl(input, props, emit)
const isPickerFocused = useElementFocusedWithin(datePicker)

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
    if (value.start === null && value.end === null) {
      return ''
    }

    return dateOrNothing(value.start) + props.rangeDelimiter + dateOrNothing(value.end)
  }

  if (value === null || value === undefined) {
    return ''
  }

  return ''
}

const {
  text,
  normalized: valueWithoutText,
} = useDateInputModelValue(valueComputed, toRef(props, 'mode'), parseDateInputValue, modelValueToString, props.formatValue)

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

  const inputValue = (target as HTMLInputElement).value

  if (isValid.value) {
    valueComputed.value = inputValue === '' ? props.clearValue : parseDateInputValue(inputValue)
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
  if (e === undefined) { return false }
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
  isDirty,
  isTouched,
  computedError,
  computedErrorMessages,
  listeners,
  validationAriaAttributes,
  validate,
  withoutValidation,
  resetValidation,
} = useValidation(props, emit, { reset, focus, value: valueComputed })

watch(isOpenSync, (isOpen) => {
  if (!isOpen) {
    isTouched.value = true
  }
})

const hasError = computed(() => (!isValid.value && valueComputed.value !== props.clearValue) || computedError.value)

const slots = useSlots()
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
} = useClearableControl(props, valueComputed)

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
  role: iconTabindexComputed.value === 0 ? 'button' : 'none',
  ariaHidden: iconTabindexComputed.value === -1,
  name: props.icon,
  color: 'secondary',
  tabindex: iconTabindexComputed.value,
}))

const filteredWrapperProps = filterComponentProps(VaInputWrapperPropsDeclaration)
const computedInputWrapperProps = computed(() => ({
  ...filteredWrapperProps.value,
  focused: isPickerFocused.value,
  error: hasError.value,
  errorMessages: computedErrorMessages.value,
  readonly: props.readonly || !props.manualInput,
}))

const { tp } = useTranslation()

const attrs = useAttrs()

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
  innerAnchorSelector: '.va-input-wrapper__field',
  trigger: ['click', 'right-click', 'enter', 'space'] as const,
}))

const inputWrapperProps = computedInputWrapperProps
const datePickerProps = filterComponentProps(VaDatePickerPropsDeclaration)

defineExpose({
  valueText,
  valueWithoutText,
  valueDate: valueWithoutText,
  focus,
  blur,
  reset,
  validate,
  showDropdown,
  hideAndFocus,
  toggleDropdown,
  focusDatePicker,
  isDirty,
  isTouched,
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
