<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import accordionConfig from '../../components/page-configs/ui-elements/va-accordion/page-config'

@Component({
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
