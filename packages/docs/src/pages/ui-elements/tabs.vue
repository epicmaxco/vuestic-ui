<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import tabsConfig from '../../page-configs/ui-elements/tabs/page-config'

@Options({
  name: 'DocsTabs',
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
