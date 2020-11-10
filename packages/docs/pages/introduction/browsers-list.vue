<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import browsersListConfig from '../../components/page-configs/introduction/browsers-list/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class BrowsersList extends Vue {
  get configComputed () {
    return browsersListConfig
  }
}
</script>
