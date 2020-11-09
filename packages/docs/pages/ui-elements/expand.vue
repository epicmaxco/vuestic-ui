<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import expandConfig from '../../components/page-configs/va-expand/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Expand extends Vue {
  get configComputed () {
    return expandConfig
  }
}
</script>
