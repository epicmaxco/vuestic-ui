<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import infiniteScrollConfig from '../../components/page-configs/ui-elements/va-infinite-scroll/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class InfiniteScroll extends Vue {
  get configComputed () {
    return infiniteScrollConfig
  }
}
</script>
