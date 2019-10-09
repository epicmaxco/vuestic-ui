<template>
  <VbDemo>
    <VbCard>
      <EventSubscriber/>
    </VbCard>
    <VbCard>
      <EventPublisher/>
    </VbCard>
  </VbDemo>
</template>

<script>
import EventPublisher from './EventPublisherExample'
import EventSubscriber from './EventSubscriberExample'

export default {
  components: {
    EventSubscriber,
    EventPublisher,
  },
}
</script>
