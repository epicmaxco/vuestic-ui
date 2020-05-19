<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import ratingConfig from '../../components/page-configs/va-rating/va-rating'

@Component({
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
