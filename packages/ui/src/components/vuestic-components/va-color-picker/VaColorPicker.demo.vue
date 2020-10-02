<template>
  <VbDemo>
    <VbCard title="Color Dot">
      <color-dot
        :color="value"
        :selected="selected"
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
import ColorDot from './ColorDot.vue'
import VaColorPicker from './VaColorPicker'
import VaColorPaletteAdvanced from './VaColorPaletteAdvanced'
import VaColorPalette from './VaColorPalette'
import { colorArray } from './VuesticTheme'

export default {
  components: {
    ColorDot,
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
