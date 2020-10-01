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
      <va-color-input-advanced
        v-model="value"
      >
      </va-color-input-advanced>

      <p>Slider Mode</p>
      <va-color-input-advanced
        v-model="value"
        mode="slider"
      >
      </va-color-input-advanced>

      <p>Advanced Mode</p>
      <va-color-input-advanced
        v-model="value"
        mode="advanced"
      >
        <va-color-input v-model="value" />
      </va-color-input-advanced>

      <p>Palette Mode</p>
      <va-color-input-advanced
        v-model="value"
        mode="palette"
        :palette="palette"
      />

      <p>Palette Mode With Slot</p>
      <va-color-input-advanced
        v-model="value"
        mode="palette"
        :palette="palette"
      >
        <color-dot :color="value" />
      </va-color-input-advanced>
    </VbCard>

    <VbCard title="Advanced Color Picker">
      <va-color-picker v-model="value" />
    </VbCard>

    <VbCard title="Palette Custom">
      <va-color-palette-advanced
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
import VaColorPicker from './VaColorPicker'
import VaColorInputAdvanced from './VaColorInputAdvanced'
import VaColorInput from './VaColorInput'
import VaColorPaletteAdvanced from './VaColorPaletteAdvanced'
import VaColorPalette from './VaColorPalette'
import VaColorSlider from './VaColorSlider'
import { colorArray } from './VuesticTheme'

export default {
  components: {
    ColorDot,
    VaColorPicker,
    VaColorInput,
    VaColorInputAdvanced,
    VaColorPaletteAdvanced,
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
