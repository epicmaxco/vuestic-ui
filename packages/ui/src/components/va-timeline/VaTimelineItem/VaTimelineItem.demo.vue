<template>
  <VbDemo>
    <VbCard title="Timeline Item with Label">
      <va-timeline-item active>
        <template #before>
          22 February, 2018
        </template>
      </va-timeline-item>
    </VbCard>
    <VbCard title="Timeline Item with Card">
      <va-timeline-item active-previous>
        <template #after>
          <va-card
            stripe
            stripe-color="success"
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
import { VaTimelineItem } from './index'
import { VaCard, VaCardContent } from '../../va-card'

export default {
  components: {
    VaCard,
    VaCardContent,
    VaTimelineItem,
  },
}
</script>
