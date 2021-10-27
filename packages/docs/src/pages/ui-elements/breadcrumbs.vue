<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import breadcrumbsConfig from '../../page-configs/ui-elements/breadcrumbs/page-config'

@Options({
  name: 'DocsBreadcrumbs',
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
