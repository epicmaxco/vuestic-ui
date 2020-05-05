<template>
  <docs-content :config="configComputed"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import ratingConfig from '../../components/docs-content/configs/va-rating'

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
