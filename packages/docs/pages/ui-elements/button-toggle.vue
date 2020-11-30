<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import buttonToggleConfig from '../../components/page-configs/ui-elements/va-button-toggle/page-config'

@Component({
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
