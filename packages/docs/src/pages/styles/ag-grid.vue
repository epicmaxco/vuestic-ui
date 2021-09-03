<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import config from '../../components/page-configs/styles/ag-grid/page-config'

@Options({
  name: 'DocsStylesAgGridWrapper',
  components: {
    DocsContent,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return config
  }
}
</script>
