<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import globalConfigConfig from '../../components/page-configs/services/global-config/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class GlobalConfig extends Vue {
  get configComputed () {
    return globalConfigConfig
  }
}
</script>
