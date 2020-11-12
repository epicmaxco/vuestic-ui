<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import parallaxConfig from '../../components/page-configs/ui-elements/va-parallax/page-config'

@Component({
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
