<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorsCustomClassesConfig from '../../page-configs/services/colors-custom-classes/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class ColorsCustomClasses extends Vue {
  get configComputed () {
    return colorsCustomClassesConfig
  }
}
</script>
