<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import accordionConfig from '../../components/page-configs/ui-elements/va-accordion/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Accordion extends Vue {
  get configComputed () {
    return accordionConfig
  }
}
</script>
