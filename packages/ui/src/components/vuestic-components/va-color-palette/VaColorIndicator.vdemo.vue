<template>
  <VbDemo>
    <VbCard title="default">
      <VaColorIndicator color="#4ae387" />
    </VbCard>
    <VbCard title="default">
      <VaColorIndicator color="#4ae387" indicator="square" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaColorIndicator from './VaColorIndicator.vue'

export default {
  components: {
    VaColorIndicator
  },
}
</script>
