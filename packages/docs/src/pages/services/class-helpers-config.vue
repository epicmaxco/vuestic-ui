<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import classHelpersConfig from '../../page-configs/services/class-helpers-config/page-config'

@Options({
  name: 'DocsClassHelpersConfig',
  components: {
    DocsContent,
  },
})
export default class IconsConfig extends Vue {
  get configComputed () {
    return classHelpersConfig
  }
}
</script>
