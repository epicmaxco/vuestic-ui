<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import imageConfig from '../../components/page-configs/ui-elements/va-image/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Image extends Vue {
  get configComputed () {
    return imageConfig
  }
}
</script>
