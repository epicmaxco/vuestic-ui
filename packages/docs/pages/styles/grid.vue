<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import gridConfig from '../../components/page-configs/styles/grid/page-config'

@Component({
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
