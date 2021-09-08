<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import popoverConfig from '../../components/page-configs/ui-elements/va-popover/page-config'

@Options({
  name: 'DocsPopover',
  components: {
    DocsContent,
  },
})
export default class Popover extends Vue {
  get configComputed () {
    return popoverConfig
  }
}
</script>
