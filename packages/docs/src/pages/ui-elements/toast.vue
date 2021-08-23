<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import toastConfig from '../../components/page-configs/ui-elements/va-toast/page-config'

@Options({
  name: 'DocsToast',
  components: {
    DocsContent,
  },
})
export default class Toast extends Vue {
  get configComputed () {
    return toastConfig
  }
}
</script>
