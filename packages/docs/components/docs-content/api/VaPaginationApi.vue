<template>
  <VaContent>
    <ApiDocs
      :component-options="VaPagination"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaPagination from '../../../../ui/src/components/vuestic-components/va-pagination/VaPagination.vue'
import VaContent from '../../../../ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaPaginationApiOptions } from './vaPaginationApiOptions'
import ApiDocs from '../../../../ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class VaPaginationApi extends Vue {
  get VaPagination () {
    return VaPagination
  }

  get apiOptions () {
    return vaPaginationApiOptions
  }
}
</script>
