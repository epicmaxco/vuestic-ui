<template>
  <VaContent>
    <ApiDocs
      :component-options="VaTabs"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaTabs from 'vuestic-ui/src/components/vuestic-components/va-tabs/VaTabs.vue'
import VaContent from 'vuestic-ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaTabsApiOptions } from './vaTabsApiOptions'
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class VaTabsApi extends Vue {
  get VaTabs () {
    return VaTabs
  }

  get apiOptions () {
    return vaTabsApiOptions
  }
}
</script>
