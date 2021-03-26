<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import progressBarConfig from '../../components/page-configs/ui-elements/va-progress-bar/page-config'

@Options({
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
