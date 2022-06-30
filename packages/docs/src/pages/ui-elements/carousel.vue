<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import carouselConfig from '../../page-configs/ui-elements/carousel/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Carousel extends Vue {
  get configComputed () {
    return carouselConfig
  }
}
</script>
