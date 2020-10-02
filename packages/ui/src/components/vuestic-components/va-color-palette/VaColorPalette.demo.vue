<template>
  <VbDemo>
    <VbCard title="Simple Palette Picker">
      <va-color-palette
        v-model="value"
        :palette="palette"
      />
    </VbCard>

    <VbCard title="Palette Advanced">
      <va-color-palette-advanced
        :palette="palette"
        v-model="value"
      />
    </VbCard>

    <VbCard title="Palette with square indicators">
      <va-color-palette
        v-model="value"
        :palette="palette"
        indicator="square"
      />
    </VbCard>

    <VbCard title="Palette Advanced with square indicators">
      <va-color-palette-advanced
        :palette="palette"
        v-model="value"
        indicator="square"
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
