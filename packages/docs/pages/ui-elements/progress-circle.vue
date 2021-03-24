<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import progressCircleConfig from '../../components/page-configs/ui-elements/va-progress-circle/page-config'

@Component({
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
