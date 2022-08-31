<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import virtualScrollerConfig from '../../page-configs/ui-elements/virtual-scroller/page-config'

@Options({
  name: 'DocsCheckbox',
  components: {
    DocsContent,
  },
})

export default class VirtualScroller extends Vue {
  get configComputed () {
    return virtualScrollerConfig
  }
}
</script>
