<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import buttonGroupConfig from '../../components/page-configs/ui-elements/va-button-group/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class ButtonGroup extends Vue {
  get configComputed () {
    return buttonGroupConfig
  }
}
</script>
