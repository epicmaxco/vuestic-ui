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
      <p>Default</p>
      <va-color-picker
        v-model="value"
      >
      </va-color-picker>

      <p>Slider Mode</p>
      <va-color-picker
        v-model="value"
        mode="slider"
      >
      </va-color-picker>

      <p>Advanced Mode</p>
      <va-color-picker
        v-model="value"
        mode="advanced"
      >
        <va-color-input v-model="value" />
      </va-color-picker>

      <p>Palette Mode</p>
      <va-color-picker
        v-model="value"
        mode="palette"
        :palette="palette"
      />

      <p>Palette Mode With Slot</p>
      <va-color-picker
        v-model="value"
        mode="palette"
        :palette="palette"
      >
        <color-dot :color="value" />
      </va-color-picker>
    </VbCard>

    <VbCard title="Advanced Color Picker">
      <va-color-advanced v-model="value" />
    </VbCard>

    <VbCard title="Palette Custom">
      <va-palette-custom
        :palette="palette"
        v-model="value"
      />
    </VbCard>

    <VbCard title="Simple Palette Picker">
      <va-color-palette
        v-model="value"
        :palette="palette"
      />
    </VbCard>

    <VbCard title="Slider Color Picker">
      <va-color-slider v-model="value" />
    </VbCard>
  </VbDemo>
</template>

<script>
import ColorDot from './ColorDot.vue'
import VaColorAdvanced from './VaColorAdvanced'
import VaColorPicker from './VaColorPicker'
import VaColorInput from './VaColorInput'
import VaPaletteCustom from './VaPaletteCustom'
import VaColorPalette from './VaColorPalette'
import VaColorSlider from './VaColorSlider'
import { colorArray } from './VuesticTheme'

export default {
  components: {
    ColorDot,
    VaColorAdvanced,
    VaColorInput,
    VaColorPicker,
    VaPaletteCustom,
    VaColorPalette,
    VaColorSlider,
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
