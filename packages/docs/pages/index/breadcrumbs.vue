<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent.vue'
import breadcrumbsConfig from '../../components/docs-content/configs/va-breadcrumbs'

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
