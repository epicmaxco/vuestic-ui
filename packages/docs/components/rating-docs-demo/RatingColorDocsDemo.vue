<template>
  <div>
    <va-content>
      <h5>Color prop demo</h5>
      <p>Here you can see different colors of component depends on color prop and more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text for more text</p>
    </va-content>
    <div class="rating-container">
      <va-rating v-model="value" color="success" />
      <va-rating v-model="value" color="info" />
      <va-rating v-model="value" color="danger" />
      <va-rating v-model="value" color="warning" />
    </div>
    <va-content>
      <pre class="code margin-bottom">{{ advancedCode }}</pre>
    </va-content>
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
      advancedCode: `
<va-rating color="success" v-model="value" />

<va-rating color="info" v-model="value" />

<va-rating color="danger" v-model="value" />

<va-rating color="warning" v-model="value" />
`,
      value: 3,
    }
  }
}
</script>

<style lang="scss" scoped>
.rating-container {
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-around;
}

.margin-bottom {
  margin-bottom: 2.5em;
}
</style>
