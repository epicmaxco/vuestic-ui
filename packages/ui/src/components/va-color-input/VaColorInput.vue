<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      role="button"
      aria-label="open color picker"
      :aria-disabled="$props.disabled"
      :tabindex="tabIndexComputed"
      :color="valueComputed"
      :indicator="$props.indicator"
      @click="callPickerDialog"
      @keydown.space="callPickerDialog"
      @keydown.enter="callPickerDialog"
    />
    <va-input
      class="va-color-input__input"
      placeholder="input color"
      v-model="valueComputed"
      :tabindex="tabIndexComputed"
      :disabled="$props.disabled"
    />
    <input
      ref="colorPicker"
      type="color"
      class="visually-hidden"
      aria-hidden="true"
      tabindex="-1"
      v-model="valueComputed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, shallowRef, computed } from 'vue'

import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

import { VaColorIndicator } from '../va-color-indicator'
import { VaInput } from '../va-input'

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
    const colorPicker = shallowRef<HTMLInputElement>()

    const { valueComputed } = useStateful(props, emit)

    const callPickerDialog = () => !props.disabled && colorPicker.value?.click()

    const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

    return {
      valueComputed,
      callPickerDialog,
      colorPicker,
      tabIndexComputed,
    }
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
    margin-left: 0.25rem;
    min-width: 5.6rem;

    &__pointer {
      cursor: pointer;
    }
  }
}
</style>
