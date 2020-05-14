<template>
  <docs-content :config="configComputed"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent.vue'
import fileUploadConfig from '../../components/docs-content/configs/va-file-upload'

@Component({
  components: {
    DocsContent,
  },
})
export default class FileUpload extends Vue {
  get configComputed () {
    return fileUploadConfig
  }
}
</script>
