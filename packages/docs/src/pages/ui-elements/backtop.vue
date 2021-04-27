<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import backtopConfig from '../../components/page-configs/ui-elements/va-backtop/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Backtop extends Vue {
  get configComputed () {
    return backtopConfig
  }
}
</script>
