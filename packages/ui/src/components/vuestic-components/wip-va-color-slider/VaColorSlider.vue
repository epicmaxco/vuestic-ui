<template>
  <SliderPicker
    v-model="valueProxy"
    class="vuestic-slider-picker"
  />
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
// @ts-ignore
import { Slider } from 'vue-color'

class ColorSliderProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })
}

const ColorSliderPropsMixin = Vue.with(ColorSliderProps)

@Options({
  name: 'VaColorSlider',
  components: {
    SliderPicker: Slider,
  },
  emits: ['update:modelValue'],
})
export default class VaColorSlider extends mixins(ColorSliderPropsMixin) {
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
