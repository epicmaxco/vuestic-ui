<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import webComponentsConfig from '../../page-configs/getting-started/web-components/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class WebComponents extends Vue {
  get configComputed () {
    return webComponentsConfig
  }
}
</script>
