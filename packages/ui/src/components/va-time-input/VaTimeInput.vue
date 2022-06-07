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
    anchorSelector=".va-input__container"
    :stateful="false"
    trigger="none"
    @keydown.up.prevent="showDropdown()"
    @keydown.down.prevent="showDropdown()"
    @keydown.space.prevent="showDropdown()"
    @click="handleComponentClick"
  >
    <template #anchor>
      <va-input
        ref="input"
        v-bind="{ ...computedInputProps, ...computedInputAttrs }"
        v-on="computedInputListeners"
        :modelValue="valueText"
        @change="onInputTextChanged($event.target.value)"
        @update:modelValue="onValueInput"
      >
        <template
          v-for="name in filterSlots"
          v-slot:[name]="slotScope"
          :key="name"
        >
          <slot
            :name="name"
            v-bind="{ ...slotScope, dropdownToggle, showDropdown, hideDropdown, isOpen: isOpenSync, focus }"
          />
        </template>

        <template #prependInner="slotScope">
          <slot
            name="prependInner"
            v-bind="{ ...slotScope, dropdownToggle, showDropdown, hideDropdown, isOpen: isOpenSync, focus }"
          />
          <va-icon
            v-if="$props.leftIcon"
            role="button"
            aria-label="toggle dropdown"
            aria-hidden="false"
            class="va-dropdown__icons__reset"
            :tabindex="iconsTabIndexComputed"
            :id="componentIconId"
            v-bind="iconProps"
            @click="dropdownToggle"
            @keydown.enter.stop="dropdownToggle"
          />
        </template>

        <template #icon>
          <va-icon
            v-if="canBeCleared"
            role="button"
            aria-label="reset"
            aria-hidden="false"
            class="va-dropdown__icons__reset"
            :tabindex="iconsTabIndexComputed"
            :id="clearIconId"
            v-bind="clearIconProps"
            @click="reset"
            @keydown.enter.stop="reset"
          />
          <va-icon
            v-else-if="!$props.leftIcon"
            role="button"
            aria-label="toggle dropdown"
            aria-hidden="false"
            class="va-dropdown__icons__reset"
            :tabindex="iconsTabIndexComputed"
            :id="componentIconId"
            v-bind="iconProps"
            @click="dropdownToggle"
            @keydown.enter.stop="dropdownToggle"
          />
        </template>
      </va-input>
    </template>

    <va-dropdown-content
      no-padding
      @keydown.esc.prevent="hideDropdown()"
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
import { computed, defineComponent, PropType, watch, shallowRef, nextTick } from 'vue'
import omit from 'lodash/omit.js'
import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import VaInput from '../va-input/VaInput.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown/'
import { useSyncProp } from '../../composables/useSyncProp'
import { useValidation, useValidationEmits, useValidationProps, ValidationProps } from '../../composables/useValidation'
import { useClearable, useClearableEmits } from '../../composables/useClearable'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { generateUniqueId } from '../../services/utils'

const slotsSelectors = [
  '.va-input-wrapper__prepend-inner',
  '.va-input__prepend-inner',
  '.va-input__append-inner',
  '.va-input-wrapper__append-inner',
]

const VaInputProps = extractComponentProps(VaInput, [
  'mask', 'returnRaw', 'autosize', 'minRows', 'maxRows', 'type', 'inputmode',
])

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaDropdown, VaDropdownContent, VaTimePicker, VaIcon, VaInput },

  emits: [...useValidationEmits, ...useClearableEmits, 'update:modelValue', 'update:isOpen'],

  props: {
    ...useComponentPresetProp,
    ...VaInputProps,
    ...extractComponentProps(VaTimePicker),
    ...useValidationProps as ValidationProps<Date>,

    isOpen: { type: Boolean, default: undefined },
    modelValue: { type: Date, default: undefined },
    clearValue: { type: Date, default: undefined },

    format: { type: Function as PropType<(date: Date) => string> },

    parse: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'schedule' },
  },

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    const input = shallowRef<typeof VaInput | undefined>()
    const timePicker = shallowRef<typeof VaTimePicker | undefined>()

    const clearIconId = generateUniqueId()
    const componentIconId = generateUniqueId()

    const [isOpenSync] = useSyncProp('isOpen', props, emit, false)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const { parse, isValid } = useTimeParser(props)
    const { format } = useTimeFormatter(props)

    const valueText = computed<string | undefined>(() => {
      if (!isValid.value) { return format(props.clearValue || new Date()) }
      if (!modelValueSync.value) { return format(props.clearValue || new Date()) }

      if (props.format) { return format(modelValueSync.value) }

      return format(modelValueSync.value)
    })

    const onInputTextChanged = (val: string) => {
      const v = parse(val)

      if (isValid.value && v) {
        modelValueSync.value = v
      }
    }

    const changePeriod = (isPM: boolean) => {
      if (!modelValueSync.value) { return }

      const halfDayPeriod = 12
      const h = modelValueSync.value.getHours()

      if (isPM && h <= halfDayPeriod) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h + halfDayPeriod))
      } else if (!isPM && h >= halfDayPeriod) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h - halfDayPeriod))
      }
    }

    const changePeriodToPm = () => changePeriod(true)
    const changePeriodToAm = () => changePeriod(false)

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

    const onValueInput = (val: string) => {
      !val && reset()
    }

    const { computedError, computedErrorMessages, listeners } = useValidation(props, emit, reset, focus)

    const hasError = computed(() => (!isValid.value && valueText.value !== props.clearValue) || computedError.value)

    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur,
    } = useClearable(props, valueText)

    const iconProps = computed(() => ({
      name: props.icon,
      color: props.color,
      size: 'small',
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

    const iconsTabIndexComputed = computed(() => props.disabled || props.readonly ? -1 : 0)
    const computedInputAttrs = computed(() => ({
      ariaLabel: props.label || 'selected time',
      ariaDisabled: props.disabled,
      ariaReadonly: props.readonly,
      tabindex: props.disabled ? -1 : 0,
      ...omit(attrs, ['class', 'style']),
    }))

    const filterSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && 'prependInner',
        (!props.leftIcon || props.clearable) && 'icon',
      ]
      return Object.keys(slots).filter(slot => !slotsWithIcons.includes(slot))
    })

    watch(modelValueSync, () => {
      isValid.value = true
    })

    const hideDropdown = () => {
      isOpenSync.value = false
      focus()
    }

    const showDropdown = () => {
      if (props.disabled || props.readonly) { return }
      isOpenSync.value = true
      nextTick(() => {
        timePicker.value?.focus()
      })
    }

    const dropdownToggle = () => {
      isOpenSync.value ? hideDropdown() : showDropdown()
    }

    // we use the global handler to prevent the toggle dropdown on any click and execute additional logic
    // we don't want to use `event.stopPropagation()` on clicks because it breaks closing the dropdown
    const handleComponentClick = (e: Event & { target: { id: string | undefined }}) => {
      const id = e.target?.id

      // (here and below) we have to use `id` instead of `ref`
      // because the icon disappears after the click and `ref` becomes `null`
      if (id === clearIconId) {
        return focus()
      }

      if (id === componentIconId) {
        return timePicker.value?.focus()
      }

      // here we check that the slots have been clicked and prevent the dropdown from opening
      // the user decides to open or hide the dropdown itself
      const isClickInSlot = slotsSelectors.some(selector => !!(e.target as HTMLElement)?.closest(selector))
      if (isClickInSlot) {
        return
      }

      if (props.manualInput) {
        return isOpenSync.value && hideDropdown()
      }

      dropdownToggle()
    }

    return {
      input,
      timePicker,
      clearIconId,
      componentIconId,

      timePickerProps: filterComponentProps(props, extractComponentProps(VaTimePicker)),
      computedInputProps,
      computedInputAttrs,
      computedInputListeners,
      iconsTabIndexComputed,
      isOpenSync,
      modelValueSync,
      valueText,
      onInputTextChanged,
      onValueInput,
      canBeCleared,
      iconProps,
      clearIconProps,
      filterSlots,

      hideDropdown,
      showDropdown,
      dropdownToggle,

      handleComponentClick,

      reset,
      focus,
      blur,
    }
  },
})
</script>
