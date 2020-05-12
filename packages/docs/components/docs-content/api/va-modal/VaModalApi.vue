<template>
  <VaContent>
    <ApiDocs
      :component-options="VaModal"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaModal from 'vuestic-ui/src/components/vuestic-components/va-modal/VaModal.vue'
import VaContent from 'vuestic-ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaModalApiOptions } from './vaModalApiOptions'
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class ModalApi extends Vue {
  get VaModal () {
    return VaModal
  }

  get apiOptions () {
    return vaModalApiOptions
  }
}
</script>

<style lang="scss">
.FormApi {

}
</style>
