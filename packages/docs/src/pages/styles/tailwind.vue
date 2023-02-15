<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import tailwindConfig from '../../page-configs/styles/tailwind/page-config'

@Options({
  name: 'DocsStylesGrid',
  components: {
    DocsContent,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return tailwindConfig
  }
}
</script>
