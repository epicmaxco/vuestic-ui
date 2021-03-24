<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '@/components/DocsContent.vue'
// @ts-ignore
import documentationPageConfig from '@/components/page-configs/contribution/documentation-page/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class DocumentationPage extends Vue {
  get configComputed () {
    return documentationPageConfig
  }
}
</script>
