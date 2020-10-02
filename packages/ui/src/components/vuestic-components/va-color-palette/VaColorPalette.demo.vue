<template>
  <VbDemo>
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
import VaColorPaletteAdvanced from './VaColorPaletteAdvanced'
import VaColorPalette from './VaColorPalette'
import { colorArray } from '../va-color-picker/VuesticTheme'

export default {
  components: {
    VaColorPaletteAdvanced,
    VaColorPalette,
  },
  data () {
    return {
      value: '#4AE387',
      palette: colorArray,
    }
  },
}
</script>
