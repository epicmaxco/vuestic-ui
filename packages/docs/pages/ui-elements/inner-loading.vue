<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import innerLoadingConfig from '../../components/page-configs/ui-elements/va-inner-loading/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class InnerLoading extends Vue {
  get configComputed () {
    return innerLoadingConfig
  }
}
</script>
