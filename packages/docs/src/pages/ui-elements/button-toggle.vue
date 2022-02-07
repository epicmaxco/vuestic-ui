<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import buttonToggleConfig from '../../page-configs/ui-elements/button-toggle/page-config'

@Options({
  name: 'DocsButtonToggle',
  components: {
    DocsContent,
  },
})
export default class ButtonToggle extends Vue {
  get configComputed () {
    return buttonToggleConfig
  }
}
</script>
