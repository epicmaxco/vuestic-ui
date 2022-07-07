<template>
  <va-dropdown
    class="va-time-input"
    :class="$attrs.class"
    :style="$attrs.style"
    v-model="isOpenSync"
    placement="bottom-start"
    :offset="[2, 0]"
    :close-on-content-click="false"
    :disabled="$props.disabled"
    anchorSelector=".va-input-wrapper__field"
    :stateful="false"
    trigger="none"
    @keydown.up.prevent="showDropdown"
    @keydown.down.prevent="showDropdown"
    @keydown.space.prevent="showDropdown"
    @keydown.esc.prevent="hideDropdown"
    @keydown.enter="!$props.manualInput && showDropdown()"
    @click="(!$props.manualInput || isOpenSync) && toggleDropdownWithoutFocus()"
  >
    <template #anchor>
      <va-input
        ref="input"
        v-bind="{ ...computedInputProps, ...computedInputAttrs }"
        v-on="computedInputListeners"
        :modelValue="valueText"
        @change="onInputTextChanged($event.target.value)"
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

        <template #prependInner="slotScope">
          <slot
            name="prependInner"
            v-bind="{ ...slotScope, toggleDropdown, showDropdown, hideDropdown, isOpen: isOpenSync, focus }"
          />
          <va-icon
            v-if="$props.leftIcon"
            role="button"
            aria-label="toggle dropdown"
            aria-hidden="false"
            :tabindex="iconsTabIndexComputed"
            v-bind="iconProps"
            @click.stop="toggleDropdown"
            @keydown.enter.stop="toggleDropdown"
          />
        </template>

        <template #icon>
          <va-icon
            v-if="canBeClearedComputed"
            role="button"
            aria-label="reset"
            aria-hidden="false"
            :tabindex="iconsTabIndexComputed"
            v-bind="clearIconProps"
            @click.stop="reset"
            @keydown.enter.stop="reset"
            @focus="onFocus"
            @blur="onBlur"
          />
          <va-icon
            v-else-if="!$props.leftIcon"
            role="button"
            aria-label="toggle dropdown"
            aria-hidden="false"
            class="va-dropdown__icons__reset"
            :tabindex="iconsTabIndexComputed"
            v-bind="iconProps"
            @click.stop="toggleDropdown"
            @keydown.enter.stop="toggleDropdown"
          />
        </template>
      </va-input>
    </template>

    <va-dropdown-content
      no-padding
      @keydown.esc.prevent="hideDropdown"
      @keypress.enter.prevent="hideDropdown"
    >
      <va-time-picker
        ref="timePicker"
        v-bind="timePickerProps"
        v-model="modelValueSync"
      />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, shallowRef, nextTick } from 'vue'
import omit from 'lodash/omit.js'

import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import {
  useSyncProp,
  useValidation, useValidationEmits, useValidationProps, ValidationProps,
  useClearable, useClearableEmits,
} from '../../composables'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'

import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import VaInput from '../va-input/VaInput.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'

const VaInputProps = extractComponentProps(VaInput, [
  'mask', 'returnRaw', 'autosize', 'minRows', 'maxRows', 'type', 'inputmode', 'counter', 'maxLength',
])

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaDropdown, VaDropdownContent, VaTimePicker, VaIcon, VaInput },

  emits: [...useValidationEmits, ...useClearableEmits, 'update:modelValue', 'update:isOpen'],

  props: {
    ...VaInputProps,
    ...extractComponentProps(VaTimePicker),
    ...useValidationProps as ValidationProps<Date>,

    isOpen: { type: Boolean, default: undefined },
    modelValue: { type: Date, default: undefined },
    clearValue: { type: Date, default: undefined },
    format: { type: Function as PropType<(date?: Date) => string> },
    parse: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'schedule' },
  },

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    const input = shallowRef<typeof VaInput>()
    const timePicker = shallowRef<typeof VaTimePicker>()

    const [isOpenSync] = useSyncProp('isOpen', props, emit, false)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const { parse, isValid } = useTimeParser(props)
    const { format } = useTimeFormatter(props)

    const valueText = computed<string>(() => format(modelValueSync.value || props.clearValue))

    const onInputTextChanged = (val: string) => {
      if (!val) {
        return reset()
      }

      const v = parse(val)

      if (isValid.value && v) {
        modelValueSync.value = v
      } else {
        modelValueSync.value = undefined
        isValid.value = true
      }
    }

    // --- not used yet ---
    // const changePeriod = (isPM: boolean) => {
    //   if (!modelValueSync.value) { return }

    //   const halfDayPeriod = 12
    //   const h = modelValueSync.value.getHours()

    //   if (isPM && h <= halfDayPeriod) {
    //     modelValueSync.value = new Date(modelValueSync.value.setHours(h + halfDayPeriod))
    //   } else if (!isPM && h >= halfDayPeriod) {
    //     modelValueSync.value = new Date(modelValueSync.value.setHours(h - halfDayPeriod))
    //   }
    // }

    // const changePeriodToPm = () => changePeriod(true)
    // const changePeriodToAm = () => changePeriod(false)

    const reset = (): void => {
      emit('update:modelValue', props.clearValue)
      emit('clear')
    }

    const focus = (): void => {
      input.value?.focus()
    }

    const blur = (): void => {
      input.value?.blur()
    }

    const { computedError, computedErrorMessages, listeners } = useValidation(props, emit, reset, focus)

    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur,
    } = useClearable(props, valueText)

    const canBeClearedComputed = computed(() => (
      canBeCleared.value && valueText.value !== format(props.clearValue)
    ))

    const iconProps = computed(() => ({
      name: props.icon,
      color: props.color,
      size: 'small',
    }))

    const computedInputProps = computed(() => ({
      ...filterComponentProps(props, VaInputProps).value,
      clearable: false,
      rules: [],
      error: computedError.value,
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

    const iconsTabIndexComputed = computed(() => props.disabled || props.readonly ? -1 : 0)
    const computedInputAttrs = computed(() => ({
      ariaLabel: props.label || 'selected time',
      ariaDisabled: props.disabled,
      ariaReadonly: props.readonly,
      tabindex: props.disabled ? -1 : 0,
      ...omit(attrs, ['class', 'style']),
    }))

    const filteredSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && 'prependInner',
        (!props.leftIcon || props.clearable) && 'icon',
      ]
      return Object.keys(slots).filter(slot => !slotsWithIcons.includes(slot))
    })

    const hideDropdown = () => {
      isOpenSync.value = false
      focus()
    }

    const showDropdownWithoutFocus = () => {
      isOpenSync.value = true
    }

    const showDropdown = () => {
      showDropdownWithoutFocus()
      nextTick(() => {
        timePicker.value?.focus()
      })
    }

    const toggleDropdown = () => {
      isOpenSync.value ? hideDropdown() : showDropdown()
    }

    const toggleDropdownWithoutFocus = () => {
      isOpenSync.value ? hideDropdown() : showDropdownWithoutFocus()
    }

    return {
      input,
      timePicker,

      timePickerProps: filterComponentProps(props, extractComponentProps(VaTimePicker)),
      computedInputProps,
      computedInputAttrs,
      computedInputListeners,
      iconsTabIndexComputed,
      isOpenSync,
      modelValueSync,
      valueText,
      onInputTextChanged,
      canBeClearedComputed,
      iconProps,
      clearIconProps,
      filteredSlots,

      hideDropdown,
      showDropdown,
      toggleDropdown,
      toggleDropdownWithoutFocus,

      reset,
      focus,
      blur,

      onFocus,
      onBlur,
    }
  },
})
</script>
