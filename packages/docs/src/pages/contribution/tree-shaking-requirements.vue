<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import treeShakingRequirementsConfig from '../../components/page-configs/contribution/tree-shaking-requirements/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class TreeShakingRequirements extends Vue {
  get configComputed () {
    return treeShakingRequirementsConfig
  }
}
</script>
