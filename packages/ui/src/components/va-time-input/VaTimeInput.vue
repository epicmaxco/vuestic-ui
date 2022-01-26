<template>
  <va-dropdown
    class="va-time-input"
    v-model="isOpenSync"
    :offset="[0, 1]"
    :close-on-content-click="false"
    :disabled="disabled || readonly"
    position="bottom-start"
    anchorSelector=".va-input__container"
    :stateful="false"
    trigger="none"
    @keydown.esc.prevent="hideDropdown"
  >
    <template #anchor>
      <va-input
        ref="input"
        v-bind="{ ...inputProps, onFocus, onBlur }"
        :modelValue="valueText"
        :readonly="readonly || !manualInput"
        :error="hasError"
        :error-messages="computedErrorMessages"
        @keyup.enter.prevent="showDropdown()"
        @click.prevent="dropdownToggle()"
        @keydown.tab="hideDropdown()"
        @change="onInputTextChanged($event.target.value)"
        @update:modelValue="onValueInput"
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
    </template>

    <va-dropdown-content no-padding>
      <va-time-picker v-bind="timePickerProps" v-model="modelValueSync" ref="timePicker" />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch, ref, nextTick } from 'vue'
import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import VaInput from '../va-input/VaInput.vue'
import { useSyncProp } from '../../composables/useSyncProp'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useClearableProps, useClearable, useClearableEmits } from '../../composables/useClearable'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaTimePicker },

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

  setup (props, { emit, expose, slots }) {
    const input = ref<InstanceType<typeof VaInput> | undefined>()
    const timePicker = ref<InstanceType<typeof VaTimePicker> | undefined>()

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

    watch(isOpenSync, (newValue) => {
      newValue && !props.manualInput && nextTick(() => timePicker.value?.focus())
    })

    const timePickerProps = filterComponentProps(props, extractComponentProps(VaTimePicker))

    const inputProps = filterComponentProps(
      props,
      extractComponentProps(VaInput, ['rules', 'error', 'errorMessages', 'clearable']),
    )

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

    const blur = (): void => {
      input.value?.blur()
    }

    const onValueInput = (val: string) => {
      !val && reset()
    }

    const {
      isFocused,
      listeners: validationListeners,
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

    const onFocus = (): void => {
      if (props.manualInput) {
        showDropdown()
      }
      validationListeners.onFocus()
    }

    const onBlur = (): void => {
      validationListeners.onBlur()
    }

    const hideDropdown = () => {
      isOpenSync.value = false
    }

    const showDropdown = () => {
      isOpenSync.value = true
    }

    const dropdownToggle = () => {
      /**
       * For `manualInput` mode, disable dropdownToggle to avoid situation when onFocus open dropdown, and it immediately
       * closed by `click` event
       **/
      if (props.manualInput && isFocused) {
        return
      }
      isOpenSync.value = !isOpenSync.value
    }

    expose({
      reset,
      focus,
      blur,
    })

    return {
      input,
      timePicker,

      timePickerProps,
      inputProps,
      isOpenSync,
      modelValueSync,
      valueText,
      onInputTextChanged,
      onFocus,
      onBlur,
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
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { (this as any).input?.focus() },
    blur () { (this as any).input?.blur() },
  },
})
</script>
