<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import overviewConfig from '../../components/page-configs/introduction/overview/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Overview extends Vue {
  get configComputed () {
    return overviewConfig
  }
}
</script>
