<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import modalConfig from '../../components/docs-content/configs/va-modal'

@Component({
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
