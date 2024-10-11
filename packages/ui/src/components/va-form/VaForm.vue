<template>
  <component
    class="va-form"
    :is="tag"
    @submit="(e: SubmitEvent) => $attrs.action === undefined && e.preventDefault()"
    v-bind="$attrs"
  >
    <slot v-bind="{
      isValid,
      isDirty,
      isTouched,
      isLoading,
      errorMessages,
      errorMessagesNamed,
      formData,
      fields,
      fieldsNamed,
      fieldNames,
      validate,
      validateAsync,
      reset,
      resetValidation,
      focus,
      focusInvalidField,
    }" />
  </component>
</template>

<script lang="ts">
import { watch, PropType, computed, onMounted } from 'vue'

import { useComponentPresetProp } from '../../composables'
import { useFormParent } from '../../composables/useForm'
import { useLocalConfigProvider } from '../../composables/useLocalConfig'
import { Form } from '../../composables/useForm/types'

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
  tag: { type: String, default: 'form' },
  trigger: { type: String as PropType<'blur' | 'change'>, default: 'blur' },
  modelValue: { type: Boolean, default: true },
  hideErrors: { type: Boolean, default: false },
  hideErrorMessages: { type: Boolean, default: false },
  hideLoading: { type: Boolean, default: false },
  stateful: { type: Boolean, default: false },
  name: { type: String, default: undefined },
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
})

onMounted(() => {
  if (props.autofocus) {
    context.focus()
  }
})

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
  isTouched,
  formData,
  fields,
  fieldsNamed,
  fieldNames,
  isValid,
  isLoading,
  errorMessages,
  errorMessagesNamed,
  validate,
  validateAsync,
  reset,
  resetValidation,
  focus,
  focusInvalidField,
} = context

defineExpose({
  immediate: immediateComputed,
  isDirty,
  formData,
  fields,
  fieldsNamed,
  fieldNames,
  isValid,
  isTouched,
  isLoading,
  errorMessages,
  errorMessagesNamed,
  validate,
  validateAsync,
  reset,
  resetValidation,
  focus,
  focusInvalidField,
} satisfies Form)
</script>

<style lang="scss">
.va-form {
  font-family: var(--va-font-family);
}
</style>
