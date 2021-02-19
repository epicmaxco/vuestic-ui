<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-color-picker"
  />
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
// @ts-ignore
import { Chrome } from 'vue-color'

class ColorPickerProps {
  value = prop<string>({
    type: String,
    default: '',
  })
}

const ColorPickerPropsMixin = Vue.with(ColorPickerProps)

@Options({
  name: 'VaColorPicker',
  components: { ChromePicker: Chrome },
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
