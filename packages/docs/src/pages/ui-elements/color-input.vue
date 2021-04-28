<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorInputConfig from '../../components/page-configs/ui-elements/va-color-input/page-config'

@Options({
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
