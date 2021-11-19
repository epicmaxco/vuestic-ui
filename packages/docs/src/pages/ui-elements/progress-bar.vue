<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import progressBarConfig from '../../page-configs/ui-elements/progress-bar/page-config'

@Options({
  name: 'DocsProgressBar',
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
