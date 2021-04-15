<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import progressBarConfig from '../../components/page-configs/ui-elements/va-progress-bar/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ProgressBar extends Vue {
  get configComputed () {
    return progressBarConfig
  }
}
</script>
