<template>
  <VbDemo>
    <VbCard title="Simple Timeline">
      <va-timeline>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          :active="item"
        >
        <template #before>
          <span
            :class="{ 'title': item, 'title title--gray': !item }"
          >
            Before text
          </span>
        </template>
        <template #after>
          <span
            :class="{ 'title': item, 'title title--gray': !item }"
          >
            After text
          </span>
        </template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>
    <VbCard
      title="Vertical Timeline"
      width="300px"
    >
      <va-timeline vertical>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          :active="item"
        >
          <template #before>
            <span
            class="va-timeline-item__text"
            :class="{ 'title': item, 'title title--gray': !item }"
            >
              Before text
            </span>
          </template>
          <template #after>
            <span
              class="va-timeline-item__text"
              :class="{ 'title': item, 'title title--gray': !item }"
            >
              After text
            </span>
          </template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>
    <VbCard title="Colorful Timeline">
      <va-timeline>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          color="info"
          :active="item"
        >
        <template #before>
          <span
            class="va-timeline-item__text"
            :class="{ 'title title--info': item, 'title title--gray': !item }"
          >
            Before text
          </span>
        </template>
        <template #after>
          <span
            class="va-timeline-item__text"
            :class="{ 'title title--info': item, 'title title--gray': !item }"
          >
            After text
          </span>
        </template>
        </va-timeline-item>
      </va-timeline>
      <va-timeline vertical>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          color="danger"
          :active="item"
        >
        <template #before>
          <span
            class="va-timeline-item__text"
            :class="{ 'title title--danger': item, 'title title--gray': !item }"
          >
            Before text
          </span>
        </template>
        <template #after>
          <span
            class="va-timeline-item__text"
            :class="{ 'title title--danger': item, 'title title--gray': !item }"
          >
            After text
          </span>
        </template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>
    <VbCard>
      {{ items }}
      <va-button @click="reroll()">
        Reroll
      </va-button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButton from './../va-button/VaButton.vue'
import VaTimeline from './VaTimeline.vue'
import VaTimelineItem from './VaTimelineItem.vue'

export default {
  components: {
    VaButton,
    VaTimeline,
    VaTimelineItem,
  },
  data () {
    return {
      items: [
        true,
        true,
        false,
      ],
    }
  },
  methods: {
    reroll () {
      const getItem = () => !!Math.floor(Math.random() * 2)
      this.items = [
        getItem(),
        getItem(),
        getItem(),
      ]
    },
  },
}
</script>
