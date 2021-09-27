<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimeInput v-model="value" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimeInput from './VaTimeInput.vue'

export default {
  components: {
    VaTimeInput,
  },

  data () {
    return {
      value: new Date(2021, 2, 20, 23, 5, 53),
      period: false,
    }
  },
}
</script>
