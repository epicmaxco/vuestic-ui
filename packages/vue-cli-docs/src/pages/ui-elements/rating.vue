<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import ratingConfig from '../../components/page-configs/ui-elements/va-rating/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Rating extends Vue {
  get configComputed () {
    return ratingConfig
  }
}
</script>
