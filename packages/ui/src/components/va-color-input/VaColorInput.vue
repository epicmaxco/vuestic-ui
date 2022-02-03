<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      :color="valueComputed"
      :indicator="indicator"
    />
    <va-input
      class="va-color-input__input"
      v-model="valueComputed"
      :disabled="disabled"
      placeholder="input color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

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
    modelValue: { type: String as PropType<string>, default: null },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    indicator: {
      type: String as PropType<'dot' | 'square'>,
      default: 'dot',
      validator: (value: string) => ['dot', 'square'].includes(value),
    },
  },
  setup: (props, { emit }) => {
    const { valueComputed } = useStateful(props, emit)

    return { valueComputed }
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
