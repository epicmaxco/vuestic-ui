<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import hoverConfig from '../../page-configs/ui-elements/hover/page-config'

@Options({
  name: 'DocsHover',
  components: {
    DocsContent,
  },
})
export default class Hover extends Vue {
  get configComputed () {
    return hoverConfig
  }
}
</script>
