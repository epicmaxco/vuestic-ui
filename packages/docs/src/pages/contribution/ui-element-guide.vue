<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import uiElementGuideConfig from '../../page-configs/contribution/ui-element-guide/page-config'

@Options({
  name: 'UiElementGuide',
  components: {
    DocsContent,
  },
})
export default class UiElementGuide extends Vue {
  get configComputed () {
    return uiElementGuideConfig
  }
}
</script>
