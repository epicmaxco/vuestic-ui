<template>
  <docs-content :config="configComputed"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent.vue'
import tabsConfig from '../../components/docs-content/configs/va-tabs'

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
