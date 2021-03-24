<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import resetConfig from '../../components/page-configs/reset/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Reset extends Vue {
  get configComputed () {
    return resetConfig
  }
}
</script>
