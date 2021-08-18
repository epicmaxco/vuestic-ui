<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-color-picker"
  />
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
// @ts-ignore
// Commented to not break demo - looks like there is an issue with vue-color: https://github.com/xiaokaike/vue-color
// import { Chrome } from 'vue-color'

class ColorPickerProps {
  value = prop<string>({
    type: String,
    default: '',
  })
}

const ColorPickerPropsMixin = Vue.with(ColorPickerProps)

@Options({
  name: 'VaColorPicker',
  // Commented to not break demo - looks like there is an issue with vue-color: https://github.com/xiaokaike/vue-color
  // components: { ChromePicker: Chrome },
  emits: ['input'],
})
export default class VaColorPicker extends mixins(ColorPickerPropsMixin) {
  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value.hex)
  }
}
</script>

<style lang="scss">
.va-color-picker {
  .vc-chrome-alpha-wrap {
    display: none;
  }

  .vc-chrome-hue-wrap {
    margin-top: 10px;
  }

  .vc-chrome-toggle-btn {
    display: none;
  }
}
</style>
