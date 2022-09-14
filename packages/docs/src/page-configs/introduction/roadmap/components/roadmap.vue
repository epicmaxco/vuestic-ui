<template>
  <div class="docs-roadmap d-flex flex-wrap">
    <div class="docs-roadmap__columns">
      <div class="docs-roadmap__column-wrapper" v-for="col in columns" :key="col.title">
        <div class="docs-roadmap__column">
          <h5>{{ col.title }}</h5>

          <va-card v-for="item in col.items" :key="item.title">
            <a :href="item.link" target="_blank">
              <va-card-content class="px-4 py-2">
                <h6 class="link">{{ item.title }}</h6>

                <div class="docs-roadmap__image" v-if="item.image">
                  <component style="width: 100%; height: auto;" :is="item.image" />
                </div>
              </va-card-content>
            </a>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { RoadmapItem } from '../types'
import images from '../images'

const props = defineProps({
  roadmap: {
    type: Array as PropType<RoadmapItem[]>,
    default: () => [],
  },
})

const colors = ['#007bba', '#f17300', '#679436', '#7a7978', '#b5179e', '#9381ff']

const items = computed(() => {
  return props.roadmap.map((item, index) => {
    return {
      ...item,
      title: typeof item === 'string' ? item : item.title,
      type: typeof item === 'string' ? '' : item.type,
      color: colors[index],
      image: item.image ? images[item.image] as any : undefined,
    }
  })
})

const components = computed(() => items.value.filter((item) => item.type === 'component'))
const services = computed(() => items.value.filter((item) => item.type === 'service'))
const other = computed(() => items.value.filter((item) => item.type !== 'service' && item.type !== 'component'))

const columns = computed(() => [
  {
    title: 'Components',
    items: components.value,
    color: 'var(--va-primary)',
  },
  {
    title: 'Services',
    items: services.value,
    color: 'var(--va-secondary)',
  },
  {
    title: 'Other',
    items: other.value,
  },
].sort((a, b) => b.items.length - a.items.length))
</script>

<style lang="scss">

  $gap: 1rem;

  .docs-roadmap {
    margin: 0 -$gap;

    &__columns {
      margin: calc($gap / 2);
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .docs-roadmap__column {
        &-wrapper {
          width: 100%;
          min-width: 300px;
          flex: 1;
          padding: calc($gap / 2);
        }

        & > *:not(h6) {
          margin-bottom: $gap;
        }

        background-color: var(--va-background);
        padding: $gap;
        height: 100%;

        .docs-roadmap__image {
          display: flex;
          justify-content: center;

          svg {
            max-height: 150px;
            max-width: 200px;
          }
        }
      }
    }
  }
</style>
