<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import config from '../../page-configs/extensions/ag-grid/page-config'

@Options({
  name: 'DocsAgGrid',
  components: {
    DocsContent,
  },
})
export default class DocsAgGrid extends Vue {
  get configComputed () {
    return config
  }
}
</script>
