<template>
  <docs-content :config="configComputed"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import sliderConfig from '../../components/docs-content/configs/va-slider'

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
