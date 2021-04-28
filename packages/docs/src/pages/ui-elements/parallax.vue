<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import parallaxConfig from '../../components/page-configs/ui-elements/va-parallax/page-config'

@Options({
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
