<template>
  <VbDemo>
    <VbCard title="Color Indicator">
      <va-color-indicator
        :color="value"
        :selected="selected"
        @click="selected = !selected"
      />
      <va-color-indicator
        :color="value"
        :selected="selected"
        indicator="square"
        @click="selected = !selected"
      />
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
  </VbDemo>
</template>

<script>
import VaColorIndicator from '../va-color-palette/VaColorIndicator.vue'
import VaColorPicker from './VaColorPicker'
import VaColorPaletteAdvanced from '../va-color-palette/VaColorPaletteAdvanced'
import VaColorPalette from '../va-color-palette/VaColorPalette'
import { colorArray } from './VuesticTheme'

export default {
  components: {
    VaColorIndicator,
    VaColorPicker,
    VaColorPaletteAdvanced,
    VaColorPalette,
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
