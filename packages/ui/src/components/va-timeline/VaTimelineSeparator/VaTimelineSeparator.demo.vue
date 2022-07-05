<template>
  <VbDemo>
    <VbCard
      title="Timeline Separator"
      width="100px"
    >
      <va-timeline-separator />
    </VbCard>
    <VbCard
      title="Vertical Timeline Separator"
    >
      <va-timeline-separator vertical style="height: 100px;" />
    </VbCard>
    <VbCard
      title="Active Timeline Center"
      width="100px"
    >
      <va-timeline-separator active />
    </VbCard>
    <VbCard
      title="Active Timeline Previous Line"
      width="100px"
    >
      <va-timeline-separator active-previous />
    </VbCard>
    <VbCard
      title="Active Timeline Next Line"
      width="100px"
    >
      <va-timeline-separator active-next />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimelineSeparator from './VaTimelineSeparator.vue'

export default {
  components: {
    VaTimelineSeparator,
  },
}
</script>
