<template>
  <va-dropdown
    class="va-time-input"
    v-model="isOpenSync"
    :offset="[0, 10]"
    :close-on-content-click="false"
    :disabled="disabled || readonly"
    position="bottom-start"
  >
    <template #anchor>
      <va-input
        ref="input"
        v-bind="{ ...inputProps, ...validationListeners }"
        :modelValue="valueText"
        :readonly="readonly || !manualInput"
        :error="!isValid || inputProps.error || computedError"
        :error-messages="computedErrorMessages"
        @change="onInputTextChanged($event.target.value)"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind"></slot>
        </template>
      </va-input>
    </template>

    <va-dropdown-content no-padding>
      <va-time-picker v-bind="timePickerProps" v-model="modelValueSync" />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch, ref } from 'vue'
import VaTimePicker from '../va-time-picker/VaTimePicker.vue'
import VaInput from '../va-input/VaInput.vue'
import { useSyncProp } from '../../composables/useSyncProp'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useTimeParser } from './hooks/time-text-parser'
import { useTimeFormatter } from './hooks/time-text-formatter'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

export default defineComponent({
  name: 'VaTimeInput',

  components: { VaTimePicker },

  emits: [...useValidationEmits, 'update:modelValue', 'update:isOpen'],

  props: {
    ...extractComponentProps(VaTimePicker),
    ...extractComponentProps(VaInput),

    ...useValidationProps,

    isOpen: { type: Boolean, default: undefined },
    modelValue: { type: Date, default: undefined },
    format: { type: Function as PropType<(date: Date) => string> },

    parse: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
  },

  setup (props, { emit, expose }) {
    const [isOpenSync] = useSyncProp('isOpen', props, emit, false)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const { parse, isValid } = useTimeParser(props)
    const { format } = useTimeFormatter(props)

    const valueText = computed<string>(() => {
      if (!isValid.value) { return '' }
      if (!modelValueSync.value) { return '' }

      if (props.format) { return props.format(modelValueSync.value) }

      return format(modelValueSync.value)
    })

    const timePickerProps = computed(() => filterComponentProps(props, extractComponentProps(VaTimePicker)))
    const inputProps = computed(() => filterComponentProps(props, extractComponentProps(VaInput, ['rules', 'error', 'errorMessages'])))

    const input = ref<InstanceType<typeof VaInput> | undefined>()

    const onInputTextChanged = (val: string) => {
      const v = parse(val)

      if (isValid.value && v) {
        modelValueSync.value = v
      }
    }

    const changePeriod = (isPM: boolean) => {
      if (!modelValueSync.value) { return }

      const h = modelValueSync.value.getHours()

      if (isPM && h <= 12) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h + 12))
      } else if (!isPM && h >= 12) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h - 12))
      }
    }

    const changePeriodToPm = () => changePeriod(true)
    const changePeriodToAm = () => changePeriod(false)

    const reset = (): void => {
      modelValueSync.value = undefined
    }

    const focus = (): void => {
      input.value?.focus()
    }

    const blur = (): void => {
      input.value?.blur()
    }

    const {
      isFocused,
      listeners: validationListeners,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, () => reset(), () => focus(), () => blur())

    expose({
      reset,
      focus,
      blur,
    })

    watch(modelValueSync, () => {
      isValid.value = true
    })

    return {
      timePickerProps,
      inputProps,
      isOpenSync,
      modelValueSync,
      valueText,
      changePeriodToPm,
      changePeriodToAm,
      onInputTextChanged,
      isValid,
      isFocused,
      reset,

      validationListeners,
      computedError,
      computedErrorMessages,
    }
  },

  // we will use this while we have 'withConfigTransport' and problem with 'expose' method in 'setup' func
  methods: {
    focus () { (this as any).input?.focus() },
    blur () { (this as any).input?.blur() },
  },
})
</script>
