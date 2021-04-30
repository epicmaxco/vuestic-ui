<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import sidebarItemConfig from '../../components/page-configs/ui-elements/va-sidebar-item/page-config'

@Options({
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
