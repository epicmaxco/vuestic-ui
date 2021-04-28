<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import listConfig from '../../components/page-configs/ui-elements/va-list/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class List extends Vue {
  get configComputed () {
    return listConfig
  }
}
</script>
