<template>
  <VbDemo>
    <VbCard title="Palette">
      <va-color-palette v-model="paletteValue" :palette="palette" />
    </VbCard>
  </VbDemo>
</template>

<script>
import { colorArray } from '../va-color-picker/VuesticTheme'
import VaColorPalette from './VaColorPalette.vue'

export default {
  components: {
    VaColorPalette,
  },
  data () {
    return {
      palette: colorArray,
      paletteValue: colorArray[0],
    }
  },
}
</script>
