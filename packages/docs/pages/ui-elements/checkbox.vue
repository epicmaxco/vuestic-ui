<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import checkboxConfig from '../../components/page-configs/ui-elements/va-checkbox/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Checkbox extends Vue {
  get configComputed () {
    return checkboxConfig
  }
}
</script>
