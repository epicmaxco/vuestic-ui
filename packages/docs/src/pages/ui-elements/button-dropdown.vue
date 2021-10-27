<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import buttonDropdownConfig from '../../page-configs/ui-elements/button-dropdown/page-config'

@Options({
  name: 'DocsButtonDropdown',
  components: {
    DocsContent,
  },
})
export default class ButtonDropdown extends Vue {
  get configComputed () {
    return buttonDropdownConfig
  }
}
</script>
