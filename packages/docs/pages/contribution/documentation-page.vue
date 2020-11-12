<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import documentationPageConfig from '../../components/page-configs/contribution/documentation-page/page-config'

@Component({
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
