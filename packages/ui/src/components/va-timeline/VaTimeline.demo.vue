<template>
  <VbDemo>
    <VbCard title="Simple Timeline">
      <va-timeline>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          :active="item"
        >
          <template #before>Before text</template>
          <template #after>After text</template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>
    <VbCard title="Simple Timeline">
      <va-timeline vertical>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          :active="item"
        >
          <template #before>Before text</template>
          <template #after>After text</template>
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
          <template #before>Before text</template>
          <template #after>After text</template>
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
          <template #before>Before text</template>
          <template #after>After text</template>
        </va-timeline-item>
      </va-timeline>
      <va-timeline vertical>
        <va-timeline-item
          v-for="(item, index) in items"
          :key="index"
          color="danger"
          :active="item"
        >
          <template #before>Before text</template>
          <template #after>After text</template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>

    <VbCard>
      {{ items }}
      <va-button @click="reroll()">
        Reroll
      </va-button>
    </VbCard>

    <VbCard title="Config">
      <VaConfig
        :components="{
          VaTimelineItem: {
            color: 'warning',
            vertical: true
          },
          VaTimeline: {
            centered: true
          }
        }"
      >
        <va-timeline>
          <va-timeline-item
            v-for="(item, index) in items"
            :key="index"
            :active="item"
          >
            <template #before>Before text</template>
            <template #after>After text</template>
          </va-timeline-item>
        </va-timeline>
      </VaConfig>
    </VbCard>

    <VbCard
      title="Raw Items Timeline"
      width="300px"
    >
      <va-timeline vertical>
        <va-timeline-item
          :active="false"
        >
          <template #before>Before text</template>
          <template #after>After text</template>
        </va-timeline-item>
        <va-timeline-item
          :active="false"
        >
          <template #before>Before text</template>
          <template #after>After text</template>
        </va-timeline-item>
      </va-timeline>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaConfig } from '../va-config'
import { VaButton } from './../va-button'
import { VaTimeline, VaTimelineItem } from './index'

export default {
  components: {
    VaConfig,
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
