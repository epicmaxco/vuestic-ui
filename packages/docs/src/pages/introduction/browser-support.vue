<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import browserSupportConfig from '../../components/page-configs/introduction/browser-support/page-config'

@Options({
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
