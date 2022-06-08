<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import spacerConfig from '../../page-configs/ui-elements/spacer/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Spacer extends Vue {
  get configComputed () {
    return spacerConfig
  }
}
</script>
