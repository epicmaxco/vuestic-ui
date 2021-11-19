<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import buttonConfig from '../../page-configs/ui-elements/button/page-config'

@Options({
  name: 'DocsButton',
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
