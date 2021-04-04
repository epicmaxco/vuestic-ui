<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import colorSliderConfig from '../../components/page-configs/ui-elements/va-color-slider/page-config'

@Component({
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
