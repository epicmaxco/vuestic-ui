<template>
  <va-dropdown
    class="va-time-input"
    :class="$attrs.class"
    :style="$attrs.style"
    v-model="isOpenSync"
    :offset="[0, 1]"
    :close-on-content-click="false"
    :disabled="$props.disabled"
    position="bottom-start"
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
        :modelValue="valueText"
        :readonly="$props.readonly || !$props.manualInput"
        :error="hasError"
        :error-messages="computedErrorMessages"
        :required-mark="$props.requiredMark"
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
            :id="componentIconId"
            v-if="$props.leftIcon"
            v-bind="iconProps"
            @click="dropdownToggle()"
          />
        </template>

        <template #icon>
          <va-icon
            :id="clearIconId"
            v-if="canBeCleared"
            v-bind="clearIconProps"
            @click="reset()"
          />
          <va-icon
            :id="componentIconId"
            v-else-if="!$props.leftIcon"
            v-bind="iconProps"
            @click="dropdownToggle()"
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
import { computed, defineComponent, InputHTMLAttributes, PropType, watch, ref } from 'vue'
import omit from 'lodash/omit'
import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import VaInput from '../va-input/VaInput.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaDropdown, { VaDropdownContent } from '../va-dropdown/'
import { useSyncProp } from '../../composables/useSyncProp'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useClearableProps, useClearable, useClearableEmits } from '../../composables/useClearable'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { generateUniqueId } from '../../services/utils'

const slotsSelectors = [
  '.va-input-wrapper__prepend-inner',
  '.va-input__prepend-inner',
  '.va-input__append-inner',
  '.va-input-wrapper__append-inner',
]

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaDropdown, VaDropdownContent, VaTimePicker, VaIcon, VaInput },

  emits: [...useValidationEmits, ...useClearableEmits, 'update:modelValue', 'update:isOpen'],

  props: {
    ...extractComponentProps(VaTimePicker),
    ...extractComponentProps(VaInput),

    ...useValidationProps,
    ...useClearableProps,

    isOpen: { type: Boolean, default: undefined },
    modelValue: { type: Date, default: undefined },
    clearValue: { type: String, default: undefined },

    format: { type: Function as PropType<(date: Date) => string> },

    parse: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'schedule' },
  },

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    const input = ref<InstanceType<typeof VaInput> | undefined>()
    const timePicker = ref<InstanceType<typeof VaTimePicker> | undefined>()
    const clearIconId = generateUniqueId()
    const componentIconId = generateUniqueId()

    const [isOpenSync] = useSyncProp('isOpen', props, emit, false)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const { parse, isValid } = useTimeParser(props)
    const { format } = useTimeFormatter(props)

    const valueText = computed<string | undefined>(() => {
      if (!isValid.value) { return props.clearValue }
      if (!modelValueSync.value) { return props.clearValue }

      if (props.format) { return props.format(modelValueSync.value) }

      return format(modelValueSync.value)
    })

    const timePickerProps = filterComponentProps(props, extractComponentProps(VaTimePicker))

    const computedInputProps = filterComponentProps(
      props,
      extractComponentProps(VaInput, ['rules', 'error', 'errorMessages', 'clearable']),
    )

    const computedInputAttrs = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
    }) as InputHTMLAttributes)

    const filterSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && 'prependInner',
        (!props.leftIcon || props.clearable) && 'icon',
      ]
      return Object.keys(slots).filter(slot => !slotsWithIcons.includes(slot))
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

    // Will be used later, after fix 'withConfigTransport'
    const blur = (): void => {
      input.value?.blur()
    }

    const onValueInput = (val: string) => {
      !val && reset()
    }

    const {
      isFocused,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, reset, focus)

    const hasError = computed(() => (!isValid.value && valueText.value !== props.clearValue) || computedError.value)

    const {
      canBeCleared,
      clearIconProps,
    } = useClearable(props, valueText, isFocused, hasError)

    const iconProps = computed(() => ({
      name: props.icon,
      color: props.color,
      size: 'small',
    }))

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
    }

    const dropdownToggle = () => {
      isOpenSync.value ? hideDropdown() : showDropdown()
    }

    // we use the global handler to prevent the toggle dropdown on any click and execute additional logic
    // we don't want to use `event.stopPropagation()` on clicks because it breaks closing the dropdown
    const handleComponentClick = (e: any) => {
      const id: string | undefined = e.target?.id

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
      const isClickInSlot = slotsSelectors.some(selector => !!e.target?.closest(selector))
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

      timePickerProps,
      computedInputProps,
      computedInputAttrs,
      isOpenSync,
      modelValueSync,
      valueText,
      onInputTextChanged,
      reset,
      onValueInput,
      canBeCleared,
      iconProps,
      clearIconProps,
      filterSlots,

      hideDropdown,
      showDropdown,
      dropdownToggle,

      computedError,
      computedErrorMessages,
      hasError,

      handleComponentClick,

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
