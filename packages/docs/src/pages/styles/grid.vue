<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import gridConfig from '../../page-configs/styles/grid/page-config'

@Options({
  name: 'DocsStylesGrid',
  components: {
    DocsContent,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return gridConfig
  }
}
</script>
