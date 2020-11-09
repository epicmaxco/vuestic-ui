<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import innerLoadingConfig from '../../components/page-configs/va-inner-loading/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class InnerLoading extends Vue {
  get configComputed () {
    return innerLoadingConfig
  }
}
</script>
