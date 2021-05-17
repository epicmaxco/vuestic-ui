<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import modalConfig from '../../components/page-configs/ui-elements/va-modal/page-config'

@Options({
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
