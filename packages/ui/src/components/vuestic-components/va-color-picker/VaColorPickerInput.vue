<template>
  <div class="va-color-picker-input">
    <div v-if="validator(this.mode)">
      <va-dropdown-popper fixed>
        <div
          slot="anchor"
          class="va-color-picker-input__slot"
        >
          <slot>
            <va-color-input
              v-model="valueProxy"
              mode="palette"
              :disabled="isInputDisabled"
              :selected="selected"
            />
          </slot>
        </div>
        <div class="va-color-picker-input__dropdown">
          <va-advanced-color-picker
            v-if="this.mode === 'advanced'"
            v-model="valueProxy"
          />
          <va-simple-palette-picker
            v-if="this.mode === 'palette'"
            v-model="valueProxy"
            :palette="palette"
          />
          <va-slider-color-picker
            v-if="this.mode === 'slider'"
            v-model="valueProxy"
          />
        </div>
      </va-dropdown-popper>
    </div>
    <div v-else>
      <slot>
        <va-color-input
          v-model="valueProxy"
          mode="palette"
          :disabled="isInputDisabled"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

import VaDropdownPopper from '../va-dropdown'
import {
  VaAdvancedColorPicker,
  VaSimplePalettePicker,
  VaSliderColorPicker,
  VaColorInput,
} from './index'

class ColorPickerInputProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

  mode = prop<string>({
    type: String,
    default: '',
  })

  palette = prop<any[]>({
    type: Array,
    default: () => [],
  })

  selected = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const ColorPickerInputPropsMixin = Vue.with(ColorPickerInputProps)

@Options({
  name: 'VaColorPickerInput',
  components: {
    VaDropdownPopper,
    VaSimplePalettePicker,
    VaAdvancedColorPicker,
    VaSliderColorPicker,
    VaColorInput,
  },
  emits: ['update:modelValue'],
})
export default class VaColorPickerInput extends mixins(ColorPickerInputPropsMixin) {
  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  get isInputDisabled () {
    return !!(this.mode === 'palette' && this.palette)
  }

  validator (value: string): boolean {
    return ['palette', 'slider', 'advanced'].includes(value)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-color-picker-input {
  &__dropdown {
    background: $white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &__slot {
    cursor: pointer;
  }
}
</style>
