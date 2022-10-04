<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import smartHelpers from '../../page-configs/styles/smart-helpers/page-config'

@Options({
  name: 'DocsStylesGrid',
  components: {
    DocsContent,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return smartHelpers
  }
}
</script>
