<template>
  <VbDemo>
    <VbCard title="Color Dot">
      <color-dot
        :color="value"
        :selected="selected"
        @click="selected = !selected"
      />
    </VbCard>

    <VbCard title="Color Input">
      <va-color-input v-model="value" />

      <p>Selected</p>
      <va-color-input
        v-model="value"
        selected
      />

      <p>Disabled</p>
      <va-color-input
        v-model="value"
        disabled
      />
    </VbCard>

    <VbCard title="Color Picker Input">
      <p>Slider Mode</p>
      <va-color-picker-input
        v-model="value"
        mode="slider"
      >
        <va-color-square :modelValue="value" />
      </va-color-picker-input>

      <p>Advanced Mode</p>
      <va-color-picker-input
        v-model="value"
        mode="advanced"
      >
        <va-color-input v-model="value" />
      </va-color-picker-input>

      <p>Palette Mode</p>
      <va-color-picker-input
        v-model="value"
        mode="palette"
        :palette="palette"
      />

      <p>Palette Mode With Slot</p>
      <va-color-picker-input
        v-model="value"
        mode="palette"
        :palette="palette"
      >
        <color-dot :color="value" />
      </va-color-picker-input>
    </VbCard>

    <VbCard title="Advanced Color Picker">
      <va-advanced-color-picker v-model="value" />
    </VbCard>

    <VbCard title="Palette Custom">
      <va-palette-custom
        :palette="palette"
        v-model="value"
      />
    </VbCard>

    <VbCard title="Simple Palette Picker">
      <va-simple-palette-picker
        v-model="value"
        :palette="palette"
      />
    </VbCard>

    <VbCard title="Slider Color Picker">
      <va-slider-color-picker v-model="value" />
    </VbCard>
  </VbDemo>
</template>

<script>
import ColorDot from './ColorDot.vue'
import VaAdvancedColorPicker from './VaAdvancedColorPicker'
import VaColorPickerInput from './VaColorPickerInput'
import VaColorSquare from './VaColorSquare'
import VaColorInput from './VaColorInput'
import VaPaletteCustom from './VaPaletteCustom'
import VaSimplePalettePicker from './VaSimplePalettePicker'
import VaSliderColorPicker from './VaSliderColorPicker'
import { colorArray } from './VuesticTheme'

export default {
  components: {
    ColorDot,
    VaAdvancedColorPicker,
    VaColorInput,
    VaColorSquare,
    VaColorPickerInput,
    VaPaletteCustom,
    VaSimplePalettePicker,
    VaSliderColorPicker,
  },
  data () {
    return {
      selected: false,
      value: '#4AE387',
      palette: colorArray,
    }
  },
}
</script>
