<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorsConfig from '../../components/page-configs/styles/colors/page-config'

@Options({
  name: 'Colors',
  components: {
    DocsContent,
  },
})
export default class Colors extends Vue {
  get configComputed () {
    return colorsConfig
  }
}
</script>
