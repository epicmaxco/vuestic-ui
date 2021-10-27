<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import sidebarItemConfig from '../../page-configs/ui-elements/sidebar-item/page-config'

@Options({
  name: 'DocsSidebarItem',
  components: {
    DocsContent,
  },
})
export default class SidebarItem extends Vue {
  get configComputed () {
    return sidebarItemConfig
  }
}
</script>
