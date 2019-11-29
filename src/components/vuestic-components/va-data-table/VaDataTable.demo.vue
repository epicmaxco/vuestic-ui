<template>
  <VbDemo>
    <VbCard title="Static Data" width="100%">
      <va-data-table-static-data-example />
    </VbCard>

    <VbCard title="Server-side Pagination" width="100%">
      <va-data-table-api-mode-example />
    </VbCard>

    <VbCard
      title="Custom data manager"
      width="100%"
    >
      <p>Clicking in the columns sorts it by the last letter</p>
      <va-data-table-custom-data-manager-example />
    </VbCard>

    <VbCard
      title="Custom Vuetable"
      width="100%"
    >
      <va-data-table-custom-styling />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaDataTableStaticDataExample from './VaDataTableStaticDataExample.vue'
import VaDataTableApiModeExample from './VaDataTableApiModeExample.vue'
import VaDataTableCustomStyling from './VaDataTableCustomStyling'

export default {
  components: {
    VaDataTableCustomStyling,
    VaDataTableStaticDataExample,
    VaDataTableApiModeExample,
  },
}
</script>

<style lang="scss">
  @import '../../vuestic-sass/resources/resources';
  @import './../../vuestic-sass/global/typography';
</style>
