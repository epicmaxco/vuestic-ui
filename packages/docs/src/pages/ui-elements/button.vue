<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import buttonConfig from '../../components/page-configs/ui-elements/va-button/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Button extends Vue {
  get configComputed () {
    return buttonConfig
  }
}
</script>
