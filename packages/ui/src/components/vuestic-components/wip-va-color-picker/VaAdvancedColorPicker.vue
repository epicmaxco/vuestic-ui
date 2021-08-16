<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-advanced-color-picker"
  />
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
// @ts-ignore
import { Chrome } from 'vue-color'

class AdvancedColorPickerProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })
}

const AdvancedColorPickerPropsMixin = Vue.with(AdvancedColorPickerProps)

@Options({
  name: 'VaAdvancedColorPicker',
  components: { ChromePicker: Chrome },
  emits: ['update:modelValue'],
})
export default class VaAdvancedColorPicker extends mixins(AdvancedColorPickerPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value.hex)
  }
}
</script>

<style lang="scss">
.va-advanced-color-picker {
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
