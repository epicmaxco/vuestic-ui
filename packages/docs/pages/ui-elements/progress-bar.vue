<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import progressBarConfig from '../../components/page-configs/va-progress-bar/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class ProgressBar extends Vue {
  get configComputed () {
    return progressBarConfig
  }
}
</script>
