<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../../components/DocsContent.vue'
import popoverConfig from '../../../components/page-configs/va-popover/page-config'

@Component({
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
