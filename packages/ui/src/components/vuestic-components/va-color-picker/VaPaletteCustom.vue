<template>
  <div class="va-palette-custom">
    <va-simple-palette-picker
      class="va-palette-custom__palette mr-2"
      :palette="palette"
      v-model="valueProxy"
    />
    <va-color-picker-input
      class="va-palette-custom__input"
      mode="advanced"
      v-model="valueProxy"
    >
      <va-color-input
        :selected="dotIsSelected"
        v-model="valueProxy"
      />
    </va-color-picker-input>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

import {
  VaColorPickerInput,
  VaSimplePalettePicker,
  VaColorInput,
} from './index'

class PaletteCustomProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

  palette = prop<Array<string>>({
    type: Array,
    default: () => [],
  })
}

const PaletteCustomPropsMixin = Vue.with(PaletteCustomProps)

@Options({
  name: 'VaPaletteCustom',
  components: {
    VaColorInput,
    VaColorPickerInput,
    VaSimplePalettePicker,
  },
  emits: ['update:modelValue'],
})
export default class VaPaletteCustom extends mixins(PaletteCustomPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  get dotIsSelected (): boolean {
    return this.palette.includes(this.modelValue)
  }
}
</script>

<style lang="scss">
.va-palette-custom {
  display: flex;
  align-items: baseline !important;
}
</style>
