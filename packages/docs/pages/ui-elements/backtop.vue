<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import backtopConfig from '../../components/page-configs/ui-elements/va-backtop/page-config'

@Component({
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
