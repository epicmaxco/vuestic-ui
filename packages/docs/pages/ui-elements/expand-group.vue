<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import expandGroupConfig from '../../components/page-configs/ui-elements/va-expand-group/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ExpandGroup extends Vue {
  get configComputed () {
    return expandGroupConfig
  }
}
</script>
