<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import installationConfig from '../../components/page-configs/getting-started/installation/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Installation extends Vue {
  get configComputed () {
    return installationConfig
  }
}
</script>
