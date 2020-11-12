<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import overviewConfig from '../../components/page-configs/introduction/overview/page-config'

@Component({
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
