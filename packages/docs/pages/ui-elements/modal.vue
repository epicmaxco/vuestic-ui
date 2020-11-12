<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import modalConfig from '../../components/page-configs/ui-elements/va-modal/page-config'

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
