<template>
  <component
    class="va-form"
    :is="tag"
  >
    <slot v-bind="{ isValid, validate }" />
  </component>
</template>

<script lang="ts">
import { defineComponent, watch, PropType } from 'vue'

import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useFormParent } from '../../composables/useForm'

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
