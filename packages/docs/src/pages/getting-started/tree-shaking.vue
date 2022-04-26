<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import treeShakingConfig from '../../page-configs/getting-started/tree-shaking/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class TreeShaking extends Vue {
  get configComputed () {
    return treeShakingConfig
  }
}
</script>
