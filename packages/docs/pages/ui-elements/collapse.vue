<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import collapseConfig from '../../components/page-configs/ui-elements/va-collapse/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Collapse extends Vue {
  get configComputed () {
    return collapseConfig
  }
}
</script>
