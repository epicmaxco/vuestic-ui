<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import breadcrumbsConfig from '../../components/page-configs/ui-elements/va-breadcrumbs/page-config'

@Options({
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
