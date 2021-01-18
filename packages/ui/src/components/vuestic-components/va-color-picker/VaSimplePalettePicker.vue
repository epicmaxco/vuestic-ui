<template>
  <div class="va-simple-palette-picker">
    <ul class="va-simple-palette-picker__colors">
      <color-dot
        v-for="(color, index) in palette"
        :key="index"
        :color="color"
        @click="handlerClick(color)"
        :selected="isSelected(color)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { ColorDot } from './index'

class SimplePalettePickerProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

  palette = prop<Array<string>>({
    type: Array,
    default: () => [],
  })
}

const SimplePalettePickerPropsMixin = Vue.with(SimplePalettePickerProps)

@Options({
  name: 'VaSimplePalettePicker',
  components: {
    ColorDot,
  },
  emits: ['update:modelValue'],
})
export default class VaSimplePalettePicker extends mixins(SimplePalettePickerPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  isSelected (color: any): boolean {
    return this.modelValue === color
  }

  handlerClick (color: any): void {
    this.valueProxy = color
  }
}
</script>

<style lang="scss">
.va-simple-palette-picker {
  padding-top: 3px;

  &__colors {
    padding: 3px;
    display: flex;
  }
}

</style>
