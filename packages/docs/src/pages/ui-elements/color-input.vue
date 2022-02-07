<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorInputConfig from '../../page-configs/ui-elements/color-input/page-config'

@Options({
  name: 'DocsColorInput',
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
