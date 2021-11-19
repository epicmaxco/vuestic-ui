<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorsConfigConfig from '../../page-configs/services/colors-config/page-config'

@Options({
  name: 'DocsColorsConfig',
  components: {
    DocsContent,
  },
})
export default class ColorsConfig extends Vue {
  get configComputed () {
    return colorsConfigConfig
  }
}
</script>
