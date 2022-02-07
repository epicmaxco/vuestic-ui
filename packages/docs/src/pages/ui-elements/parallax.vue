<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import parallaxConfig from '../../page-configs/ui-elements/parallax/page-config'

@Options({
  name: 'DocsParallax',
  components: {
    DocsContent,
  },
})
export default class Parallax extends Vue {
  get configComputed () {
    return parallaxConfig
  }
}
</script>
