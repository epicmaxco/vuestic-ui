<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import modalConfig from '../../page-configs/ui-elements/modal/page-config'

@Options({
  name: 'DocsModal',
  components: {
    DocsContent,
  },
})
export default class Modal extends Vue {
  get configComputed () {
    return modalConfig
  }
}
</script>
