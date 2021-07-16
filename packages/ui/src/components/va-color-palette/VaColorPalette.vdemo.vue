<template>
  <VbDemo>
    <VbCard title="Palette">
      <va-color-palette v-model="paletteValue" :palette="palette" />
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaColorPalette } from './index'

const colorArray = [
  '#4ae387',
  '#e34a4a',
  '#4ab2e3',
  '#db76df',
  '#f7cc36',
]

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
