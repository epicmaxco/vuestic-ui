<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import cssVariablesConfig from '../../components/page-configs/styles/css-variables/page-config'

@Options({
  name: 'DocsStylesCssVariables',
  components: {
    DocsContent,
  },
})
export default class Grid extends Vue {
  get configComputed () {
    return cssVariablesConfig
  }
}
</script>
