<template>
  <VbDemo>
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

    <VbCard title="Advanced Color Input">
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
        <va-color-indicator :color="value" />
      </va-color-input-advanced>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaColorIndicator from '../va-color-palette/VaColorIndicator.vue'
import VaColorInputAdvanced from './VaColorInputAdvanced.vue'
import VaColorInput from './VaColorInput'
import { colorArray } from '../va-color-picker/VuesticTheme'

export default {
  components: {
    VaColorIndicator,
    VaColorInput,
    VaColorInputAdvanced,
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
