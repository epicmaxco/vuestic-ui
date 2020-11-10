<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import nuxtIntegrationConfig from '../../components/page-configs/getting-started/nuxt-integration/page-config'

@Component({
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
