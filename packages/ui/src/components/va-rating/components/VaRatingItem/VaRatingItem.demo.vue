<template>
  <VbDemo>
    <VbCard title="Filled">
      <va-rating-item :modelValue="1" />
    </VbCard>
    <VbCard title="Empty">
      <va-rating-item />
    </VbCard>
    <VbCard title="Custom empty color">
      <va-rating-item hover unselected-color="danger" />
    </VbCard>
    <VbCard title="Half icon">
      <va-rating-item hover halves />
    </VbCard>
    <VbCard title="Use custom icon">
      <va-rating-item hover icon="verified" />
      <va-rating-item hover halves half-icon="contrast" />
      <va-rating-item hover empty-icon="heart_empty" />
    </VbCard>
    <VbCard title="Sizes">
      <va-rating-item :modelValue="1" :size="40" />
      <va-rating-item :modelValue="1" size="large" />
      <va-rating-item :modelValue="1" size="medium" />
      <va-rating-item :modelValue="1" size="small" />
    </VbCard>
    <VbCard title="Colors">
      <va-rating-item color="success" :modelValue="1" />
      <va-rating-item color="danger" :modelValue="0.5" />
      <va-rating-item color="#e3e" :modelValue="0" />
    </VbCard>
    <VbCard title="With hover">
      <p>Without halves</p>
      <va-rating-item hover />
      <p>With halves</p>
      <va-rating-item halves hover />
    </VbCard>
    <VbCard title="With value">
      <va-counter v-model="ratingModel" :min="0" :step="0.5" :max="1" />
      <va-rating-item unselected-color="danger" hover v-model="ratingModel" halves />
    </VbCard>

    <VbCard title="Click event">
      <va-rating-item :modelValue="clickEventValue" halves @click="clickEventValue = $event" />
      {{ clickEventValue }}
    </VbCard>
    <VbCard title="Hover event">
      <va-rating-item :modelValue="hoverEventValue" halves hover @hover="hoverEventValue = $event" />
      {{ hoverEventValue }}
    </VbCard>
    <VbCard title="Change value onClick">
      <va-rating-item
        :modelValue="ratingModel"
        halves
        hover
        @click="ratingModel = $event" />
      {{ ratingModel }}
    </VbCard>
    <VbCard title="Using slot">
      <div>
        <button @click="slotValue = 0">Reset button</button>
        {{ slotValue }}
      </div>
      <va-rating-item halves hover :modelValue="slotValue" @click="slotValue = $event">
        <template v-slot="{ onClick, value }">
          <button @click="onClick" v-if="value === 1">Active</button>
          <button @click="onClick" v-if="value === 0.5">Halfed</button>
          <button @click="onClick" v-if="value === 0">Blank</button>
        </template>
      </va-rating-item>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaRatingItem } from './index'
import { VaCounter } from '../../../va-counter'

export default {
  components: {
    VaRatingItem,
    VaCounter,
  },
  data () {
    return {
      clickEventValue: 0,
      hoverEventValue: 0,
      ratingModel: 0.5,
      slotValue: 0,
    }
  },
}
</script>
