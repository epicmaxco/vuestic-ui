<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import roadmapConfig from '../../components/page-configs/introduction/roadmap/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Roadmap extends Vue {
  get configComputed () {
    return roadmapConfig
  }
}
</script>
