<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import breakpointsConfig from '../../page-configs/services/breakpoints/page-config'

@Options({
  name: 'DocsColorsConfig',
  components: {
    DocsContent,
  },
})
export default class ColorsConfig extends Vue {
  get configComputed () {
    return breakpointsConfig
  }
}
</script>
