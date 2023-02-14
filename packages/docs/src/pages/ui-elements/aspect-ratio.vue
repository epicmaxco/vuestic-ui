<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import aspectRatioConfig from '../../page-configs/ui-elements/aspect-ratio/page-config'

@Options({
  name: 'DocsAspectRatio',
  components: {
    DocsContent,
  },
})
export default class AspectRatio extends Vue {
  get configComputed () {
    return aspectRatioConfig
  }
}
</script>
