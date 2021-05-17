<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import collapseConfig from '../../components/page-configs/ui-elements/va-collapse/page-config'

@Options({
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
