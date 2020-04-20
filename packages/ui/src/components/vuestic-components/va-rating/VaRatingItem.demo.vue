<template>
  <VbDemo>
    <VbCard title="Filled">
      <va-rating-item :value="1" />
    </VbCard>
    <VbCard title="Empty">
      <va-rating-item />
    </VbCard>
    <VbCard title="Half icon">
      <va-rating-item :value="0.5" halves />
    </VbCard>
    <VbCard title="Use custom icon">
      <p>Filled</p>
      <va-rating-item :value="1" filled-icon-name="heart" />
      <p>Empty</p>
      <va-rating-item empty-icon-name="heart_empty" />
    </VbCard>
    <VbCard title="Sizes">
      <p>Large</p>
      <va-rating-item :value="1" size="large" />
      <p>Medium</p>
      <va-rating-item :value="1" size="medium" />
      <p>Small</p>
      <va-rating-item :value="1" size="small" />
    </VbCard>

    <VbCard title="With hover">
      <p>Without halves</p>
      <va-rating-item hover />
      <p>With halves</p>
      <va-rating-item halves hover />
    </VbCard>

    <VbCard title="With value">
      <input v-model.number="ratingModel" style="width: 40px;">
      <va-rating-item :value="ratingModel" halves/>
    </VbCard>

    <VbCard title="Click event">
      {{ clickEventValue }}
      <va-rating-item :value="0" halves @click="clickEventValue = $event"/>
    </VbCard>
    <VbCard title="Hover event">
      {{ hoverEventValue }}
      <va-rating-item :value="0" halves hover @hover="hoverEventValue = $event"/>
    </VbCard>
    <VbCard title="Change value onClick">
      {{ ratingModel }}
      <va-rating-item
        :value="ratingModel"
        halves
        hover
        @click="ratingModel = $event"/>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaRatingItem from './VaRatingItem'

export default {
  components: {
    VaRatingItem,
  },
  data () {
    return {
      clickEventValue: 0,
      hoverEventValue: 0,
      ratingModel: 0.5,
    }
  },
}
</script>
