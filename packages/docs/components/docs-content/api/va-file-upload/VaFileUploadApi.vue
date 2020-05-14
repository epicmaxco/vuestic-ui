<template>
  <VaContent>
    <ApiDocs
      :component-options="VaFileUpload"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaFileUpload from 'vuestic-ui/src/components/vuestic-components/va-file-upload/VaFileUpload.vue'
import VaContent from 'vuestic-ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaFileUploadApiOptions } from './vaFileUploadApiOptions'
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class ModalApi extends Vue {
  get VaFileUpload () {
    return VaFileUpload
  }

  get apiOptions () {
    return vaFileUploadApiOptions
  }
}
</script>
