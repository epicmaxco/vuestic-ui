<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import scrollContainerConfig from '../../page-configs/ui-elements/scroll-container/page-config'

@Options({
  components: {
  DocsContent,
  },
  })
export default class ScrollContainer extends Vue {
  get configComputed () {
    return scrollContainerConfig
  }
}
</script>
