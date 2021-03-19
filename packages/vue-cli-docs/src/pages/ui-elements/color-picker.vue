<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorPickerConfig from '../../components/page-configs/ui-elements/va-color-picker/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class ColorPicker extends Vue {
  get configComputed () {
    return colorPickerConfig
  }
}
</script>
