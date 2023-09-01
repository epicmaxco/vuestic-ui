<template>
  <component
    class="va-form"
    :is="tag"
    v-bind="$attrs"
  >
    <slot v-bind="context" />
  </component>
</template>

<script lang="ts" setup>
import { watch, computed, PropType } from 'vue'

import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useFormParent } from '../../composables/useForm'
import { useLocalConfigProvider } from '../../composables/useLocalConfig'

const childProps = { stateful: true }

const statefulConfig = {
  VaInput: childProps,
  VaSelect: childProps,
  VaCheckbox: childProps,
  VaRadio: childProps,
  VaDatePicker: childProps,
  VaTimePicker: childProps,
  VaColorPicker: childProps,
  VaSlider: childProps,
  VaSwitch: childProps,
  VaFileUpload: childProps,
  VaRating: childProps,
  VaDateInput: childProps,
  VaTimeInput: childProps,
}

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
  if (!childProps.stateful) { return {} }

  return statefulConfig
}))

const { isLoading, isValid, validate } = context
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
