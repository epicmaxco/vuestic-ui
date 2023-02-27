<template>
  <component
    class="va-form"
    :is="tag"
  >
    <slot v-bind="{ isValid }" />
  </component>
</template>

<script lang="ts">
import { defineComponent, watch, PropType } from 'vue'

import { FormServiceKey, FormChild, Form } from './consts'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useForm } from './composables/useForm'

const isVaForm = (value: any): value is Form => !!value.focusInvalid

export default defineComponent({
  name: 'VaForm',
  props: {
    ...useComponentPresetProp,
    autofocus: { type: Boolean, default: false },
    tag: { type: String, default: 'div' },
    trigger: { type: String as PropType<'blur' | 'change'>, default: 'blur' },
    modelValue: { type: Boolean, default: true },
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const {
      isValid,
      reset,
      resetValidation,
      focus,
      focusInvalid,
      validate,
    } = useForm()

    watch(isValid, (value) => {
      emit('update:modelValue', value)
    })

    watch(() => props.autofocus, (value) => {
      if (value) {
        focus()
      }
    })

    watch(() => props.modelValue, (value) => {
      if (!value) {
        reset()
      }
    })

    return {
      isValid,
      reset,
      resetValidation,
      focus,
      focusInvalid,
      validate,
    }
  },
})
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
