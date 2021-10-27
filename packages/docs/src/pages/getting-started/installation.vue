<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import installationConfig from '../../page-configs/getting-started/installation/page-config'

@Options({
  name: 'DocsInstallation',
  components: {
    DocsContent,
  },
})
export default class Installation extends Vue {
  get configComputed () {
    return installationConfig
  }
}
</script>
