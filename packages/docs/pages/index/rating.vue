<template>
  <docs-content :config="config"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import ratingConfig from '../../components/docs-content/configs/rating'

@Component({
  components: {
    DocsContent,
  },
})
export default class Rating extends Vue {
  get config () {
    return ratingConfig
  }
}
</script>
