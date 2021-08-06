<template>
  <VbDemo>
    <VbCard title="Color Input">
      <va-color-input v-model="value" />
    </VbCard>
    <VbCard title="Color Input (disabled)">
      <va-color-input
        v-model="value"
        disabled
      />
    </VbCard>
    <VbCard title="Color Input (stateful)">
      <va-color-input
        modelValue="#fff000"
        stateful
      />
    </VbCard>

    <!-- <VbCard title="Advanced Color Input">
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
    </VbCard> -->
  </VbDemo>
</template>

<script>
import VaColorInput from './VaColorInput'

const colorArray = [
  '#4ae387',
  '#e34a4a',
  '#4ab2e3',
  '#db76df',
  '#f7cc36',
]

export default {
  components: {
    VaColorInput,
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
