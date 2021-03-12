<template>
  <VbDemo>
    <VbCard title="Color indicator">
      <va-color-indicator :color="palette[0]" />
      <va-color-indicator :color="palette[1]" indicator="square" />
    </VbCard>

    <VbCard title="Palette">
      <va-color-palette v-model="paletteValue" :palette="palette" />
    </VbCard>
  </VbDemo>
</template>

<script>
import { colorArray } from '../va-color-picker/VuesticTheme'
import { VaColorIndicator, VaColorPalette } from './index'

export default {
  components: {
    VaColorIndicator, VaColorPalette,
  },
  data () {
    return {
      palette: colorArray,
      paletteValue: colorArray[0],
    }
  },
}
</script>
