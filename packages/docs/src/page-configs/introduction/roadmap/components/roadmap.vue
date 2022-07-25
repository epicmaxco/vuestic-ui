<template>
  <div class="docs-roadmap d-flex flex-wrap">
    <router-link
      class="roadmap-item__wrapper"
      v-for="(item, index) in roadmap"
      :key="index"
      :to="item.link"
    >
      <va-card
        :color="colors[index]"
        gradient
        class="roadmap-item"
      >
        <div class="d-flex justify--center flex-direction--column" style="height: 100%; color: white;">
          <h5>{{ title(item) }}</h5>
          <div class="roadmap-item__type title">
            {{ type(item) }}
          </div>
        </div>
      </va-card>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { RoadmapItem } from '../types'

const props = defineProps({
  roadmap: {
    type: Array as PropType<RoadmapItem[]>,
    default: () => [],
  },
})

const colors = ['#007bba', '#f17300', '#679436', '#7a7978', '#b5179e', '#9381ff']

const title = (item: RoadmapItem) => {
  if (typeof item === 'string') {
    return item
  }
  return item.title
}

const type = (item: RoadmapItem) => {
  return typeof item === 'string' ? '' : item.type
}
</script>

<style lang="scss" scoped>
.docs-roadmap {
  margin: -1rem;

  .roadmap-item {
    padding: 0.5rem 1rem;
    color: var(--va-white);

    &__wrapper {
      width: 33%;
      padding: 0.5rem;
      box-sizing: border-box;
    }

    h5 {
      color: currentColor;
    }

    &__type {
      height: 1.25rem;
    }
  }
}
</style>
