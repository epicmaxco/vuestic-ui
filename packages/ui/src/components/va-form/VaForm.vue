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
import { defineComponent, watch, PropType, computed } from 'vue'

import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useFormParent } from '../../composables/useForm'
import { useLocalConfigProvider } from '../../composables/useLocalConfig'

const props = { stateful: true }

const statefulConfig = {
  VaInput: props,
  VaSelect: props,
  VaCheckbox: props,
  VaRadio: props,
  VaDatePicker: props,
  VaTimePicker: props,
  VaColorPicker: props,
  VaSlider: props,
  VaSwitch: props,
  VaFileUpload: props,
  VaRating: props,
  VaDateInput: props,
  VaTimeInput: props,
}

export default defineComponent({
  name: 'VaForm',

  props: {
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
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
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

    return {
      ...context,
      context: context,
    }
  },
})
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
