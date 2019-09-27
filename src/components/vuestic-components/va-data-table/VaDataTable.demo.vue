<template>
  <VbDemo>
    <VbCard title="Static Data" width="100%">
      <va-data-table-static-data-example />
    </VbCard>

    <VbCard title="Server-side Pagination" width="100%">
      <va-data-table-api-mode-example />
    </VbCard>

     <VbCard title="Custom data manager" width="100%">
      <p>Clicking in the columns sorts it by the last letter</p>
      <va-data-table-custom-data-manager-example />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaDataTableStaticDataExample from './VaDataTableStaticDataExample.vue'
import VaDataTableApiModeExample from './VaDataTableApiModeExample.vue'
import VaDataTableCustomDataManagerExample from './VaDataTableCustomDataManagerExample'

export default {
  components: {
    VaDataTableStaticDataExample,
    VaDataTableApiModeExample,
    VaDataTableCustomDataManagerExample,
  },
}
</script>

<style lang="scss">
</style>
