<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import advancedIconsConfigConfig from '../../components/page-configs/services/advanced-icons-config/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class AdvancedIconsConfig extends Vue {
  get configComputed () {
    return advancedIconsConfigConfig
  }
}
</script>
