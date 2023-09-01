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
        :style="cursorStyleComputed"
        v-bind="computedInputWrapperProps"
        @click.stop="toggleDropdown"
      >
        <template #default>
          <input
            ref="input"
            class="va-time-input__input"
            v-bind="inputAttributesComputed"
            v-on="computedInputListeners"
            @change="onInputTextChanged"
          />
        </template>

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
            :aria-label="tp($props.ariaToggleDropdownLabel)"
            v-bind="iconProps"
            @click.stop="showDropdown"
            @keydown.enter.stop="showDropdown"
            @keydown.space.stop="showDropdown"
          />
        </template>

        <template #icon>
          <va-icon
            v-if="canBeClearedComputed"
            v-bind="{ ...iconProps, ...clearIconProps }"
            :aria-label="tp($props.ariaResetLabel)"
            @click.stop="reset"
            @keydown.enter.stop="reset"
            @keydown.space.stop="reset"
          />
          <va-icon
            v-else-if="!$props.leftIcon && $props.icon"
            :aria-label="tp($props.ariaToggleDropdownLabel)"
            @click.stop="showDropdown"
            @keydown.enter.stop="showDropdown"
            @keydown.space.stop="showDropdown"
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
import { computed, defineComponent, PropType, shallowRef, nextTick } from 'vue'
import omit from 'lodash/omit'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import {
  useComponentPresetProp,
  useSyncProp,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useClearable, useClearableEmits, useClearableProps,
  useFocus, useFocusEmits,
  useStateful, useStatefulEmits, useStatefulProps,
  useTranslation,
  useDropdownable, useDropdownableProps, useDropdownableEmits, useLongPressKey,
} from '../../composables'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'

import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper, ['focused', 'maxLength', 'counterValue'])

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaDropdown, VaDropdownContent, VaTimePicker, VaIcon, VaInputWrapper },

  emits: [
    ...useFocusEmits,
    ...useValidationEmits,
    ...useClearableEmits,
    ...useStatefulEmits,
    ...useDropdownableEmits,
    'update:modelValue',
  ],

  props: {
    ...VaInputWrapperProps,
    ...useDropdownableProps,
    ...useComponentPresetProp,
    ...useClearableProps,
    ...extractComponentProps(VaTimePicker),
    ...useValidationProps as ValidationProps<Date>,
    ...useStatefulProps,

    closeOnContentClick: { type: Boolean, default: false },
    offset: { ...useDropdownableProps.offset, default: () => [2, 0] },
    placement: { ...useDropdownableProps.placement, default: 'bottom-end' },
    modelValue: { type: Date, default: undefined },
    clearValue: { type: Date, default: undefined },
    format: { type: Function as PropType<(date?: Date) => string> },
    parse: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'schedule' },

    ariaLabel: { type: String, default: '$t:selectedTime' },
    ariaResetLabel: { type: String, default: '$t:resetTime' },
    ariaToggleDropdownLabel: { type: String, default: '$t:toggleDropdown' },
  },

  inheritAttrs: false,

  setup (props, { emit, slots, attrs }) {
    const input = shallowRef<HTMLInputElement>()
    const timePicker = shallowRef<typeof VaTimePicker>()

    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => Array.isArray(props.view) && props.view.length === 1),
    })
    const { valueComputed } = useStateful(props, emit)

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

    const { isFocused, focus, blur, onFocus: focusListener, onBlur: blurListener } = useFocus(input)

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
    })

    const {
      computedError,
      computedErrorMessages,
      listeners,
      validationAriaAttributes,
      withoutValidation,
      resetValidation,
    } = useValidation(props, emit, { reset, focus, value: valueComputed })

    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur,
    } = useClearable(props, valueText)

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
    }))

    const viewToNumber = {
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
    }

    const onKeyPress = (e: KeyboardEvent | FocusEvent) => {
      if (!('key' in e)) { return }

      if (e.key === 'ArrowDown') {
        valueComputed.value = new Date(Number(valueComputed.value) - viewToNumber[props.view])
      }
      if (e.key === 'ArrowUp') {
        valueComputed.value = new Date(Number(valueComputed.value) + viewToNumber[props.view])
      }

      e.preventDefault()
    }

    useLongPressKey(input, {
      onStart: onKeyPress,
      onUpdate: onKeyPress,
    })

    const computedInputListeners = ({
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
    })

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
      size: 'small',
      name: props.icon,
      color: 'secondary',
      tabindex: iconTabindexComputed.value,
    }))

    const { tp } = useTranslation()

    const inputAttributesComputed = computed(() => ({
      readonly: props.readonly || !props.manualInput,
      disabled: props.disabled,
      tabindex: props.disabled ? -1 : 0,
      value: valueText.value,
      'aria-label': props.label || tp(props.ariaLabel),
      'aria-required': props.requiredMark,
      'aria-disabled': props.disabled,
      'aria-readonly': props.readonly,
      ...validationAriaAttributes.value,
      ...omit(attrs, ['class', 'style']),
    }))

    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      keyboardNavigation: true,
      innerAnchorSelector: '.va-input-wrapper__field',
      trigger: 'none' as const,
    }))

    return {
      tp,
      input,
      timePicker,

      timePickerProps: filterComponentProps(extractComponentProps(VaTimePicker)),
      dropdownPropsComputed,
      computedInputWrapperProps,
      computedInputListeners,
      isOpenSync,
      doShowDropdown,
      valueComputed,
      valueText,
      onInputTextChanged,
      canBeClearedComputed,
      iconProps,
      clearIconProps,
      filteredSlots,
      inputAttributesComputed,
      cursorStyleComputed,

      hideDropdown,
      showDropdown,
      toggleDropdown,

      reset,
      focus,
      blur,
    }
  },
})
</script>

<style lang="scss">
@import "variables";
</style>
