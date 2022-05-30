<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      :color="valueComputed"
      :indicator="$props.indicator"
      @click="callPickerDialog"
    />
    <va-input
      class="va-color-input__input"
      :disabled="$props.disabled"
      v-model="valueComputed"
      placeholder="input color"
    />
    <input
      ref="colorPicker"
      type="color"
      class="visually-hidden"
      v-model="valueComputed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, shallowRef } from 'vue'

import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

import VaColorIndicator from '../va-color-indicator'
import VaInput from '../va-input'

export default defineComponent({
  name: 'VaColorInput',
  components: {
    VaInput,
    VaColorIndicator,
  },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    modelValue: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    indicator: {
      type: String as PropType<'dot' | 'square'>,
      default: 'dot',
      validator: (value: string) => ['dot', 'square'].includes(value),
    },
  },
  setup: (props, { emit }) => {
    const { valueComputed } = useStateful(props, emit)

    const colorPicker = shallowRef<HTMLInputElement>()
    const callPickerDialog = () => !props.disabled && colorPicker.value?.click()

    return { valueComputed, callPickerDialog, colorPicker }
  },
})
</script>

<style lang="scss">
.va-color-input {
  display: flex;
  align-items: center !important;

  .form-group {
    margin-bottom: 0;
  }

  &__input {
    margin-bottom: 0;
    min-width: 5.6rem;

    &__pointer {
      cursor: pointer;
    }
  }
}
</style>
