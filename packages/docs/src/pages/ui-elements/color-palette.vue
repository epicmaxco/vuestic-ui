<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorPaletteConfig from '../../page-configs/ui-elements/color-palette/page-config'

@Options({
  name: 'DocsColorPalette',
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
