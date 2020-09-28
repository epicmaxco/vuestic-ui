<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import toastConfig from '../../components/page-configs/va-toast/page-config'

@Component({
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
