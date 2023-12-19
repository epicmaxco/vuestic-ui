<template>
  <component
    class="va-form"
    :is="tag"
    v-bind="$attrs"
  >
    <slot v-bind="{ isValid, validate }" />
  </component>
</template>

<script lang="ts">
import { watch, PropType, computed } from 'vue'

import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useFormParent } from '../../composables/useForm'
import { useLocalConfigProvider } from '../../composables/useLocalConfig'

const statefulProps = { stateful: true }

const statefulConfig = {
  VaInput: statefulProps,
  VaSelect: statefulProps,
  VaCheckbox: statefulProps,
  VaRadio: statefulProps,
  VaDatePicker: statefulProps,
  VaTimePicker: statefulProps,
  VaColorPicker: statefulProps,
  VaSlider: statefulProps,
  VaSwitch: statefulProps,
  VaFileUpload: statefulProps,
  VaRating: statefulProps,
  VaDateInput: statefulProps,
  VaTimeInput: statefulProps,
}
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaForm',
})

const props = defineProps({
  ...useComponentPresetProp,
  autofocus: { type: Boolean, default: false },
  immediate: { type: Boolean, default: false },
  tag: { type: String, default: 'div' },
  trigger: { type: String as PropType<'blur' | 'change'>, default: 'blur' },
  modelValue: { type: Boolean, default: true },
  hideErrors: { type: Boolean, default: false },
  hideErrorMessages: { type: Boolean, default: false },
  hideLoading: { type: Boolean, default: false },
  stateful: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const context = useFormParent(props)

watch(context.isValid, (value) => {
  emit('update:modelValue', value)
})

watch(() => props.autofocus, (value) => {
  if (value) {
    context.focus()
  }
}, { immediate: true })

watch(context.fields, (newVal) => {
  if (newVal.length && props.immediate) {
    context.validate()
  }
}, { immediate: true })

useLocalConfigProvider(computed(() => {
  if (!props.stateful) { return {} }

  return statefulConfig
}))

const {
  immediate: immediateComputed,
  isDirty,
  formData,
  fields,
  fieldsNamed,
  fieldNames,
  isValid,
  isLoading,
  errorMessages,
  errorMessagesNamed,
  validate,
  reset,
  resetValidation,
  focus,
  focusInvalidField,
} = context
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
