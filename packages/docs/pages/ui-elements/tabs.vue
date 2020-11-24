<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import tabsConfig from '../../components/page-configs/ui-elements/va-tabs/page-config'

@Component({
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
