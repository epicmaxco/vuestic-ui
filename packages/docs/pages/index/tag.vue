<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import tagConfig from '../../components/page-configs/va-tag/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Tag extends Vue {
  get configComputed () {
    return tagConfig
  }
}
</script>
