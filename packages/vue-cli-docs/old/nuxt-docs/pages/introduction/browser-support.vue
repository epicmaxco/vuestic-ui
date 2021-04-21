<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import browserSupportConfig from '../../components/page-configs/introduction/browser-support/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class BrowserSupport extends Vue {
  get configComputed () {
    return browserSupportConfig
  }
}
</script>
