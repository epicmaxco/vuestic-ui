<template>
  <VbDemo>
    <VbCard title="count events" refresh>
      {{ counter }} {{ lastPubs }}
    </VbCard>
    <VbCard>
      <EventSubscriber />
    </VbCard>
    <VbCard>
      <EventPublisher />
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
  data () {
    return {
      counter: 0,
    }
  },
  watch: {
    lastPubs: {
      deep: true,
      immediate: true,
      handler (value) {
        console.log('value', value)
      },
    },
  },
}
</script>
