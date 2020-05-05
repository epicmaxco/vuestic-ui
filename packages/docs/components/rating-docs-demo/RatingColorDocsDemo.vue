<template>
  <div>
    <div class="rating-container">
      <va-rating v-model="value" color="success" />
      <va-rating v-model="value" color="info" />
      <va-rating v-model="value" color="danger" />
      <va-rating v-model="value" color="warning" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaContent from '../../../ui/src/components/vuestic-components/va-content/VaContent.vue'
import VaRating from '../../../ui/src/components/vuestic-components/va-rating/VaRating.vue'

@Component({
  components: { VaContent, VaRating },
})
export default class RatingColorDocsDemo extends Vue {
  data () {
    return {
      value: 3,
    }
  }
}
</script>

<style lang="scss" scoped>
// .rating-container {
//   height: 50px;
//   align-items: center;
//   display: flex;
//   justify-content: space-around;
// }

// .margin-bottom {
//   margin-bottom: 2.5em;
// }
</style>
