<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import configurationGuideConfig from '../../components/page-configs/getting-started/configuration-guide/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ConfigurationGuide extends Vue {
  get configComputed () {
    return configurationGuideConfig
  }
}
</script>
