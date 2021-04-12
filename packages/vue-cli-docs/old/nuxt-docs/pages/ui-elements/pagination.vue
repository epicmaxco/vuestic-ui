<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import paginationConfig from '../../components/page-configs/ui-elements/va-pagination/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Pagination extends Vue {
  get configComputed () {
    return paginationConfig
  }
}
</script>
