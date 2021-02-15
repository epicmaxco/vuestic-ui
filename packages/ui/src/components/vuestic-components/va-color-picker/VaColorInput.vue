<template>
  <div class="va-color-input">
    <color-dot
      class="va-color-input__dot"
      :selected="selected"
      :color="modelValue"
      @click="onClick()"
    />
    <va-input
      class="va-color-input__input"
      v-model="valueProxy"
      :disabled="disabled"
      placeholder="input color"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

import VaInput from '../va-input'
import { ColorDot } from './index'

class ColorInputProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

  selected = prop<boolean>({
    type: Boolean,
    default: false,
  })

  disabled = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const ColorInputPropsMixin = Vue.with(ColorInputProps)

@Options({
  name: 'VaColorInput',
  components: {
    VaInput,
    ColorDot,
  },
  emits: ['update:modelValue', 'click'],
})
export default class VaColorInput extends mixins(ColorInputPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  onClick (): void {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.va-color-input {
  display: flex;
  align-items: center !important;

  .form-group {
    margin-bottom: 0;
  }

  &__input {
    margin-bottom: 0;
    width: 9ch;

    &__pointer {
      cursor: pointer;
    }
  }
}

</style>
