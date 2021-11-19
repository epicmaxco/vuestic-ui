<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import sidebarConfig from '../../page-configs/ui-elements/sidebar/page-config'

@Options({
  name: 'DocsSidebar',
  components: {
    DocsContent,
  },
})
export default class Affix extends Vue {
  get configComputed () {
    return sidebarConfig
  }
}
</script>
