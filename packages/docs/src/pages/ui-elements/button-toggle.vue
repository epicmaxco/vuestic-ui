<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import buttonToggleConfig from '../../components/page-configs/ui-elements/va-button-toggle/page-config'

@Options({
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
