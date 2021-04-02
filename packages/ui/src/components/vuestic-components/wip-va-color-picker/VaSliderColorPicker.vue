<template>
  <SliderPicker
    v-model="valueProxy"
    class="vuestic-slider-picker"
  />
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
// @ts-ignore
import { Slider } from 'vue-color'

class ColorPickerInputProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })
}

const ColorPickerInputPropsMixin = Vue.with(ColorPickerInputProps)

@Options({
  name: 'VaColorPickerInput',
  components: {
    SliderPicker: Slider,
  },
  emits: ['update:modelValue'],
})
export default class VaColorPickerInput extends mixins(ColorPickerInputPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value.hex)
  }
}
</script>

<style>
.vuestic-slider-picker {
  max-width: 100%;
  padding: 8px;
}
</style>
