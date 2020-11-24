<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import colorPaletteConfig from '../../components/page-configs/ui-elements/va-color-palette/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ColorPalette extends Vue {
  get configComputed () {
    return colorPaletteConfig
  }
}
</script>
