<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import colorsClassesConfig from '../../page-configs/services/colors-classes/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class ColorsClasses extends Vue {
  get configComputed () {
    return colorsClassesConfig
  }
}
</script>
