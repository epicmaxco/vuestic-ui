<template>
  <VbDemo>
    <VbCard title="Timeline Item with Label">
      <va-timeline-item
        is-first
        is-last
      >
        <div slot="before">
          22 February, 2018
        </div>
      </va-timeline-item>
    </VbCard>
    <VbCard title="Timeline Item with Card">
      <va-timeline-item
        is-first
        is-last
      >
        <va-card
          slot="after"
          stripe
          stripe-color="success"
          title-on-image
        >
          <va-card-content>
            Running out of pages in your passport. Two trailer park girls go
            around the outside.
          </va-card-content>
        </va-card>
      </va-timeline-item>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimelineItem from './VaTimelineItem.vue'
import VaCard from '../va-card/VaCard'
import VaCardContent from '../va-card/VaCardContent'

export default {
  components: {
    VaCard,
    VaCardContent,
    VaTimelineItem,
  },
}
</script>
