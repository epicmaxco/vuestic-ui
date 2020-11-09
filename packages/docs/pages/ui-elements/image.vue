<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import imageConfig from '../../components/page-configs/va-image/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Image extends Vue {
  get configComputed () {
    return imageConfig
  }
}
</script>
