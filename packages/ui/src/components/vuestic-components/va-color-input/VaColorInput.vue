<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      :selected="selected"
      :color="value"
      :indicator="indicator"
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
import { VaColorIndicator } from '../va-color-palette'
import VaInput from '../va-input'

class ColorInputProps {
  value = prop<string>({
    type: String,
    default: '',
  })

  indicator = prop<string>({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
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
    VaColorIndicator,
  },
  emits: ['click', 'input'],
})
export default class VaColorInput extends mixins(ColorInputPropsMixin) {
  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value)
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
