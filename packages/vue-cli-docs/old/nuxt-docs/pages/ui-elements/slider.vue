<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import sliderConfig from '../../components/page-configs/ui-elements/va-slider/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Slider extends Vue {
  get configComputed () {
    return sliderConfig
  }
}
</script>
