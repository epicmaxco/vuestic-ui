<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import nuxtConfig from '../../page-configs/getting-started/nuxt/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Nuxt extends Vue {
  get configComputed () {
    return nuxtConfig
  }
}
</script>
