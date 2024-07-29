<template>
  <VbDemo>
    <VbCard title="Color Input">
      <va-color-input v-model="value" />
    </VbCard>
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
  </VbDemo>
  <VbCard title="Color Input (Full length)">
    <va-color-input
      v-model="value"
    />
  </VbCard>
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
