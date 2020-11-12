<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import infiniteScrollConfig from '../../components/page-configs/ui-elements/va-infinite-scroll/page-config'

@Component({
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
