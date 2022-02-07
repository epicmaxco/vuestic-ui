<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import innerLoadingConfig from '../../page-configs/ui-elements/inner-loading/page-config'

@Options({
  name: 'DocsInnerLoading',
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
