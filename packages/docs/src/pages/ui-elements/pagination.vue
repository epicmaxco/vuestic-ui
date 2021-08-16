<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import paginationConfig from '../../components/page-configs/ui-elements/va-pagination/page-config'

@Options({
  name: 'DocsPagination',
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
