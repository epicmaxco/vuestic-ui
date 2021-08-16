<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import checkboxConfig from '../../components/page-configs/ui-elements/va-checkbox/page-config'

@Options({
  name: 'DocsCheckbox',
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
