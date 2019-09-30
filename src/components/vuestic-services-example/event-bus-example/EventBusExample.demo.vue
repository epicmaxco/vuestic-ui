<template>
  <VbDemo>
    <event-subscriber/>
    <event-publisher/>
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
