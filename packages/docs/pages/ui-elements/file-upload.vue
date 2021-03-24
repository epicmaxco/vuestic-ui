<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import fileUploadConfig
  from '../../components/page-configs/ui-elements/va-file-upload/page-config'

@Component({
  components: { DocsContent },
})
export default class FileUpload extends Vue {
  get configComputed () {
    return fileUploadConfig
  }
}
</script>
