<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import splitConfig from '../../page-configs/ui-elements/split/page-config'

@Options({
  components: {
  DocsContent,
  },
  })
export default class Split extends Vue {
  get configComputed () {
    return splitConfig
  }
}
</script>
