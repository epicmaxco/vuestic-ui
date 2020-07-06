<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tag title="vuestic" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTag from './VaTag'

export default {
  components: {
    VaTag,
  },
  data () {
    return {
      value: 0,
    }
  },
}
</script>

<style scoped>
</style>
