<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import progressCircleConfig from '../../components/page-configs/ui-elements/va-progress-circle/page-config'

@Options({
  name: 'DocsProgressCircle',
  components: {
    DocsContent,
  },
})
export default class ProgressCircle extends Vue {
  get configComputed () {
    return progressCircleConfig
  }
}
</script>
