<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import sliderConfig from '../../components/page-configs/va-slider/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Slider extends Vue {
  get configComputed () {
    return sliderConfig
  }
}
</script>
