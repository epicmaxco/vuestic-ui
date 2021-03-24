<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import nuxtIntegrationConfig from '../../components/page-configs/getting-started/nuxt-integration/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class NuxtIntegration extends Vue {
  get configComputed () {
    return nuxtIntegrationConfig
  }
}
</script>
