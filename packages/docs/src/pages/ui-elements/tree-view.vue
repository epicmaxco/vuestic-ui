<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import treeViewConfig from '../../page-configs/ui-elements/tree-view/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class TreeView extends Vue {
  get configComputed () {
    return treeViewConfig
  }
}
</script>
