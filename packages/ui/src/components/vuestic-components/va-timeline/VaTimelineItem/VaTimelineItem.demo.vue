<template>
  <VbDemo>
    <VbCard title="Timeline Item with Label">
      <va-timeline-item
        is-first
        is-last
      >
        <template #before>
          <div>
            22 February, 2018
          </div>
        </template>
      </va-timeline-item>
    </VbCard>
    <VbCard title="Timeline Item with Card">
      <va-timeline-item
        is-first
        is-last
      >
        <template #after>
          <va-card
            stripe
            stripe-color="success"
            title-on-image
          >
            <va-card-content>
              Running out of pages in your passport. Two trailer park girls go
              around the outside.
            </va-card-content>
          </va-card>
        </template>
      </va-timeline-item>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimelineItem from './VaTimelineItem.vue'
import VaCard from '../../va-card/VaCard'
import VaCardContent from '../../va-card/VaCardContent'

export default {
  components: {
    VaCard,
    VaCardContent,
    VaTimelineItem,
  },
}
</script>
