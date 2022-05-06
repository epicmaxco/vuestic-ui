<template>
  <VbDemo>
    <VbCard title="Color indicator">
      <va-color-indicator :color="palette[0]" />
      <va-color-indicator :color="palette[1]" square />
    </VbCard>

    <VbCard title="Color indicator (selectable)">
      <va-color-indicator :color="palette[0]" v-model="selected[0]" />
      <va-color-indicator :color="palette[1]" v-model="selected[1]" square />
    </VbCard>

    <VbCard title="Color indicator (stateful)">
      <va-color-indicator :color="palette[0]" stateful />
      <va-color-indicator :color="palette[1]" square stateful />
    </VbCard>

    <VbCard title="Color indicator (with color picker)">
      <va-color-indicator v-model:color="palette[0]" picker />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaColorIndicator from './index'

const colorArray = ['#4ae387', '#e34a4a']

export default {
  components: {
    VaColorIndicator,
  },
  data () {
    return {
      selected: [true, false],
      palette: colorArray,
      paletteValue: colorArray[0],
    }
  },
}
</script>
