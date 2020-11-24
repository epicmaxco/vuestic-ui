<template>
  <VbDemo>
    <VbCard title="Value">
      {{ value }}
    </VbCard>
    <VbCard title="Slider Color Picker">
      <va-color-slider v-model="value" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaColorSlider from './VaColorSlider'

export default {
  components: {
    VaColorSlider,
  },
  data () {
    return {
      value: '#4AE387',
    }
  },
}
</script>
