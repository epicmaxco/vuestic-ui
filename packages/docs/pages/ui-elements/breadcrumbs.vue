<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import breadcrumbsConfig from '../../components/page-configs/ui-elements/va-breadcrumbs/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Breadcrumbs extends Vue {
  get configComputed () {
    return breadcrumbsConfig
  }
}
</script>
