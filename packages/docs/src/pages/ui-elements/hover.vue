<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import hoverConfig from '../../components/page-configs/ui-elements/va-hover/page-config'

@Options({
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
