<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import dividerConfig from '../../components/page-configs/ui-elements/va-divider/page-config'

@Options({
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
