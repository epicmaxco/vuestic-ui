<template>
  <VbDemo>
    <VbCard title="Color indicator">
      <va-color-indicator
        v-for="color in palette"
        :key="color"
        :color="color"
        tabindex="0"
      />
      <br />
      <va-color-indicator
        v-for="color in palette"
        :key="color"
        :color="color"
        square
        tabindex="0"
      />
    </VbCard>

    <VbCard title="Color indicator (selectable)">
      <va-color-indicator
        v-for="(color, idx) in palette"
        :key="color"
        :color="color"
        v-model="selected[idx]"
        tabindex="0"
      />
      <br />
      <va-color-indicator
        v-for="(color, idx) in palette"
        :key="color"
        :color="color"
        v-model="selected[idx]"
        square
        tabindex="0"
      />
    </VbCard>

    <VbCard title="Color indicator (stateful)">
      <va-color-indicator
        v-for="color in palette"
        :key="color"
        :color="color"
        stateful
        tabindex="0"
      />
      <br />
      <va-color-indicator
        v-for="color in palette"
        :key="color"
        :color="color"
        square
        stateful
        tabindex="0"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaColorIndicator } from './index'

const COLORS = [
  '#4ae387',
  '#e34a4a',
  '#154EC1',
  '#767C88',
  '#262824',
  '#FFFFFF',
  '#FFD43A',
]

export default {
  components: {
    VaColorIndicator,
  },
  data () {
    return {
      palette: COLORS,
      paletteValue: COLORS[0],
      selected: [true, false, false, false, false, false, false, false],
    }
  },
}
</script>

<style scoped>
.va-color-indicator + .va-color-indicator {
  margin-left: 0.5rem;
}
</style>
