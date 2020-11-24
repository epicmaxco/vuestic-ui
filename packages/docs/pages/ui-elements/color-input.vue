<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import colorInputConfig from '../../components/page-configs/ui-elements/va-color-input/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ColorInput extends Vue {
  get configComputed () {
    return colorInputConfig
  }
}
</script>
