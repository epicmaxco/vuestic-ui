<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import componentsConfigConfig from '../../components/page-configs/services/components-config/page-config'

@Options({
  name: 'DocsComponentConfig',
  components: {
    DocsContent,
  },
})
export default class ComponentsConfig extends Vue {
  get configComputed () {
    return componentsConfigConfig
  }
}
</script>
