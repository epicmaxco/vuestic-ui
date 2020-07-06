<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tag>
        vuestic
      </va-tag>
    </VbCard>

    <VbCard title="Closeable">
      <va-checkbox v-model="value" />
      <va-tag
        v-model="value"
        closeable
      >
        vuestic
      </va-tag>

    </VbCard>
  </VbDemo>
</template>

<script>
import VaTag from './VaTag'
import VaCheckbox from '../va-checkbox/VaCheckbox'

export default {
  components: {
    VaTag,
    VaCheckbox,
  },
  data () {
    return {
      value: true,
    }
  },
}
</script>

<style scoped>
</style>
