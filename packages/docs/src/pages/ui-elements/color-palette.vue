<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorPaletteConfig from '../../components/page-configs/ui-elements/va-color-palette/page-config'

@Options({
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
