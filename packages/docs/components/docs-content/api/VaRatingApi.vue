<template>
  <VaContent>
    <ApiDocs
      :component-options="VaRating"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaRating from '../../../../ui/src/components/vuestic-components/va-rating/VaRating.vue'
import VaContent from '../../../../ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaRatingApiOptions } from './vaRatingApiOptions'
import ApiDocs from '../../../../ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class RatingApi extends Vue {
  get VaRating () {
    return VaRating
  }

  get apiOptions () {
    return vaRatingApiOptions
  }
}
</script>

<style lang="scss">
.RatingApi {

}
</style>
