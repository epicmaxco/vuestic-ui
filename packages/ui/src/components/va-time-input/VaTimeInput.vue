<template>
  <va-dropdown
    v-model="doShowDropdown"
    class="va-time-input"
    :class="$attrs.class"
    :style="$attrs.style"
    v-bind="dropdownPropsComputed"
  >
    <template #anchor>
      <va-input-wrapper
        class="va-time-input__anchor"
        ref="input"
        :style="cursorStyleComputed"
        v-bind="{ ...computedInputWrapperProps, ...validationAriaAttributes, ...computedInputListeners }"
        @change="onInputTextChanged"
      >
        <template
          v-for="name in filteredSlots"
          :key="name"
          v-slot:[name]="slotScope"
        >
          <slot
            :name="name"
            v-bind="{ ...slotScope, toggleDropdown, showDropdown, hideDropdown, isOpen: isOpenSync, focus }"
          />
        </template>

        <template #prependInner="slotScope" v-if="$slots.prependInner || $props.leftIcon">
          <slot
            name="prependInner"
            v-bind="{ ...slotScope, toggleDropdown, showDropdown, hideDropdown, isOpen: isOpenSync, focus }"
          />
          <va-icon
            v-if="$props.leftIcon"
            class="va-time-input__left-button va-time-input__side-button"
            :aria-label="tp($props.ariaToggleDropdownLabel)"
            v-bind="iconProps"
          />
        </template>

        <template #icon>
          <va-icon
            v-if="canBeClearedComputed"
            class="va-time-input__clear-button"
            v-bind="{ ...iconProps, ...clearIconProps }"
            :aria-label="tp($props.ariaResetLabel)"
            @click.stop="reset"
            @keydown.enter.stop="reset"
            @keydown.space.stop="reset"
          />
          <va-icon
            v-if="!$props.leftIcon && $props.icon"
            class="va-time-input__right-button va-time-input__side-button"
            :aria-label="tp($props.ariaToggleDropdownLabel)"
            v-bind="iconProps"
          />
        </template>
      </va-input-wrapper>
    </template>

    <va-dropdown-content
      no-padding
      @keydown.esc.prevent="hideDropdown"
      @keydown.enter.prevent="hideDropdown"
    >
      <va-time-picker
        ref="timePicker"
        v-bind="timePickerProps"
        v-model="valueComputed"
      />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, PropType, shallowRef, nextTick, useSlots, useAttrs, watch } from 'vue'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import {
  useComponentPresetProp,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useClearableControl, useClearableControlEmits, useClearableControlProps,
  useElementFocused,
  useFocusableControl, useFocusableControlProps, useFocusableControlEmits,
  useStateful, useStatefulEmits, useStatefulProps,
  useTranslation, useTranslationProp,
  useDropdownableControl, useDropdownableControlProps, useDropdownableControlEmits, useLongPress,
} from '../../composables'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'

import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import VaTimePicker from '../va-time-picker/VaTimePicker.vue'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper, ['focused', 'maxLength', 'counterValue'])
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaTimeInput',
  inheritAttrs: false,
})

const props = defineProps({
  ...VaInputWrapperProps,
  ...useDropdownableControlProps,
  ...useComponentPresetProp,
  ...useClearableControlProps,
  ...extractComponentProps(VaTimePicker),
  ...useValidationProps as ValidationProps<Date>,
  ...useStatefulProps,
  ...useFocusableControlProps,

  closeOnContentClick: { type: Boolean, default: false },
  offset: { ...useDropdownableControlProps.offset, default: () => [2, 0] },
  placement: { ...useDropdownableControlProps.placement, default: 'bottom-end' },
  modelValue: { type: Date, default: undefined },
  clearValue: { type: Date, default: null },
  format: { type: Function as PropType<(date?: Date) => string> },
  parse: { type: Function as PropType<(input: string) => Date> },
  manualInput: { type: Boolean, default: false },
  leftIcon: { type: Boolean, default: false },
  icon: { type: String, default: 'schedule' },

  ariaLabel: useTranslationProp('$t:selectedTime'),
  ariaResetLabel: useTranslationProp('$t:resetTime'),
  ariaToggleDropdownLabel: useTranslationProp('$t:toggleDropdown'),
})

const emit = defineEmits([
  ...useValidationEmits,
  ...useClearableControlEmits,
  ...useStatefulEmits,
  ...useDropdownableControlEmits,
  ...useFocusableControlEmits,
  'update:modelValue',
])

const input = shallowRef<HTMLInputElement>()
const timePicker = shallowRef<typeof VaTimePicker>()

const { isOpenSync, dropdownProps } = useDropdownableControl(props, emit, {
  defaultCloseOnValueUpdate: computed(() => Array.isArray(props.view) && props.view.length === 1),
})
const valueComputed = useStateful<Date>(props, emit)

const { parse, isValid } = useTimeParser(props)
const { format } = useTimeFormatter(props)

const valueText = computed<string>(() => format(valueComputed.value || props.clearValue))

const doShowDropdown = computed({
  get () {
    if (props.disabled || props.readonly) { return false }

    return isOpenSync.value
  },
  set (v: boolean) {
    isOpenSync.value = v

    if (v) {
      nextTick(() => timePicker.value?.focus())
    } else {
      nextTick(() => input.value?.focus())
    }
  },
})

const isFocused = useElementFocused(input)
const { blur, focus } = useFocusableControl(input, props, emit)

const onInputTextChanged = (e: Event) => {
  if (props.disabled) { return }

  const val = (e.target as HTMLInputElement)?.value
  if (!val) {
    return reset()
  }

  const v = parse(val)

  if (isValid.value && v) {
    valueComputed.value = v
  } else {
    valueComputed.value = undefined
    isValid.value = true
  }
}

// --- not used yet ---
// const changePeriod = (isPM: boolean) => {
//   if (!valueComputed.value) { return }

//   const halfDayPeriod = 12
//   const h = valueComputed.value.getHours()

//   if (isPM && h <= halfDayPeriod) {
//     valueComputed.value = new Date(valueComputed.value.setHours(h + halfDayPeriod))
//   } else if (!isPM && h >= halfDayPeriod) {
//     valueComputed.value = new Date(valueComputed.value.setHours(h - halfDayPeriod))
//   }
// }

// const changePeriodToPm = () => changePeriod(true)
// const changePeriodToAm = () => changePeriod(false)

const reset = () => withoutValidation(() => {
  emit('update:modelValue', props.clearValue)
  emit('clear')
  resetValidation()
  hideDropdown()
})

const {
  computedError,
  computedErrorMessages,
  listeners,
  validationAriaAttributes,
  withoutValidation,
  resetValidation,
  isDirty,
  isTouched,
} = useValidation(props, emit, { reset, focus, value: valueComputed })

watch(doShowDropdown, (v) => {
  if (!v) {
    isTouched.value = true
  }
})

const {
  canBeCleared,
  clearIconProps,
} = useClearableControl(props, valueText)

const canBeClearedComputed = computed(() => (
  canBeCleared.value && valueText.value !== format(props.clearValue)
))

const filteredWrapperProps = filterComponentProps(VaInputWrapperProps)
const computedInputWrapperProps = computed(() => ({
  ...filteredWrapperProps.value,
  focused: isFocused.value,
  error: computedError.value,
  errorMessages: computedErrorMessages.value,
  readonly: props.readonly || !props.manualInput,
  modelValue: valueText.value,
}))

const viewToNumber = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
}

const onKeyPress = (e: Event) => {
  if (!('key' in e)) { return }

  if (e.key === 'ArrowDown') {
    valueComputed.value = new Date(Number(valueComputed.value) - viewToNumber[props.view])
    e.preventDefault()
  }
  if (e.key === 'ArrowUp') {
    valueComputed.value = new Date(Number(valueComputed.value) + viewToNumber[props.view])
    e.preventDefault()
  }
}

useLongPress(input, {
  onStart: onKeyPress,
  onUpdate: onKeyPress,
})

const computedInputListeners = ({
  onBlur: () => {
    if (props.disabled) { return }

    if (props.readonly) { return }
    listeners.onBlur()
  },
})

const slots = useSlots()

const filteredSlots = computed(() => {
  const slotsWithIcons = [
    props.leftIcon && 'prependInner',
    (!props.leftIcon || props.clearable) && 'icon',
  ]
  return Object.keys(slots).filter(slot => !slotsWithIcons.includes(slot))
})

const hideDropdown = () => {
  doShowDropdown.value = false
}

const showDropdown = (event?: KeyboardEvent, cancel?: boolean, prevent?: boolean) => {
  doShowDropdown.value = true
}

const checkProhibitedDropdownOpening = (e?: KeyboardEvent) => {
  if (isOpenSync.value) { return false }
  if (props.disabled || props.readonly) { return true }
  if (e === undefined) { return false }
  return props.manualInput && e?.code !== 'Space'
}

const toggleDropdown = (event: Event | KeyboardEvent) => {
  if (checkProhibitedDropdownOpening(event instanceof KeyboardEvent ? event : undefined)) { return }

  doShowDropdown.value = !doShowDropdown.value
}

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
  'aria-hidden': false,
  name: props.icon,
  color: 'secondary',
  tabindex: iconTabindexComputed.value,
}))

const { tp } = useTranslation()

const dropdownPropsComputed = computed(() => ({
  ...dropdownProps.value,
  innerAnchorSelector: '.va-input-wrapper__field',
  trigger: ['click', 'right-click', 'space', 'enter'] as const,
}))

const timePickerProps = filterComponentProps(extractComponentProps(VaTimePicker))

defineExpose({
  isFocused,
  isValid,
  value: valueComputed,
  isDirty,
  isTouched,
  focus,
  blur,
  reset,
  withoutValidation,
  resetValidation,
  toggleDropdown,
  showDropdown,
  hideDropdown,
})
</script>
