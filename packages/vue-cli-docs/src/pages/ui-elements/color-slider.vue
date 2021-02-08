<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorSliderConfig from '../../components/page-configs/ui-elements/va-color-slider/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class ColorSlider extends Vue {
  get configComputed () {
    return colorSliderConfig
  }
}
</script>
