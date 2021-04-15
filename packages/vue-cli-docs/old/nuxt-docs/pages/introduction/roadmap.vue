<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import roadmapConfig from '../../components/page-configs/introduction/roadmap/page-config'

@Component({
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
