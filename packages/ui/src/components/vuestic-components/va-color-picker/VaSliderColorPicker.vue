<template>
  <SliderPicker
    v-model="valueProxy"
    class="vuestic-slider-picker"
  />
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
// @ts-ignore
import { Slider } from 'vue-color'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'VaColorPickerInput',
  components: {
    SliderPicker: Slider,
  },
  emits: ['update:modelValue'],
})
export default class VaColorPickerInput extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly modelValue!: string

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
