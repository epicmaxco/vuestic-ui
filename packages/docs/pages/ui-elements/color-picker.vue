<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import colorPickerConfig from '../../components/page-configs/ui-elements/va-color-picker/page-config'

@Component({
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
