<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import gridConfig from '../../page-configs/styles/colors/page-config'

@Options({
  name: 'DocsStylesColors',
  components: {
    DocsContent,
  },
})
export default class Colors extends Vue {
  get configComputed () {
    return gridConfig
  }
}
</script>
