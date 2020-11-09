<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import gridConfig from '../../components/page-configs/grid/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return gridConfig
  }
}
</script>
