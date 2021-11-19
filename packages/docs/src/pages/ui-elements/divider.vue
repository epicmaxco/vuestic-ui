<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import dividerConfig from '../../page-configs/ui-elements/divider/page-config'

@Options({
  name: 'DocsDivider',
  components: {
    DocsContent,
  },
})
export default class Divider extends Vue {
  get configComputed () {
    return dividerConfig
  }
}
</script>
