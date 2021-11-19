<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import collapseConfig from '../../page-configs/ui-elements/collapse/page-config'

@Options({
  name: 'DocsCollapse',
  components: {
    DocsContent,
  },
})
export default class Collapse extends Vue {
  get configComputed () {
    return collapseConfig
  }
}
</script>
