<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import tabsConfig from '../../components/page-configs/ui-elements/va-tabs/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Tabs extends Vue {
  get configComputed () {
    return tabsConfig
  }
}
</script>
