<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import ratingConfig from '../../components/page-configs/va-rating/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Rating extends Vue {
  get configComputed () {
    return ratingConfig
  }
}
</script>
