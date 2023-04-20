<template>
  <div class="docs-roadmap flex flex-wrap">
    <div class="docs-roadmap__columns">
      <div
        v-for="col in columns"
        :key="col.title"
        class="docs-roadmap__column-wrapper"
      >
        <div class="docs-roadmap__column text-center">
          <h5 v-if="col.items.length > 0" class="mb-[20px]">
            {{ col.title }}
          </h5>

          <va-card
            v-for="item in col.items"
            :key="item.title"
            :href="item.link"
            target="_blank"
            text-color="primary"
          >
            <va-card-content class="px-6 py-2">
              <h6 class="link">
                {{ item.title }}
              </h6>

              <div
                v-if="item.image"
                class="docs-roadmap__image"
              >
                <component
                  :is="item.image"
                  style="width: 100%; min-height: 100px;"
                />
              </div>
            </va-card-content>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { RoadmapItem } from "../types";
import * as images from "../images";


const props = defineProps({
  roadmap: {
    type: Array as PropType<RoadmapItem[]>,
    default: () => [],
  },
});

const colors = [
  "#007bba",
  "#f17300",
  "#679436",
  "#7a7978",
  "#b5179e",
  "#9381ff",
];

const items = computed(() => {
  return props.roadmap.map((item, index) => {
    return {
      ...item,
      title: typeof item === "string" ? item : item.title,
      type: typeof item === "string" ? "" : item.type,
      color: colors[index],
      image: item.image ? ((images as Record<string, any>)[item.image]) : undefined,
    };
  });
});

const components = computed(() =>
  items.value.filter((item) => item.type === "component")
);
const services = computed(() =>
  items.value.filter((item) => item.type === "service")
);
const other = computed(() =>
  items.value.filter(
    (item) => item.type !== "service" && item.type !== "component"
  )
);

const columns = computed(() =>
  [
    {
      title: "Components",
      items: components.value,
      color: "var(--va-primary)",
    },
    {
      title: "Services",
      items: services.value,
      color: "var(--va-secondary)",
    },
    {
      title: "Other",
      items: other.value,
    },
  ].sort((a, b) => b.items.length - a.items.length)
);
</script>

<style lang="scss">
$gap: 1rem;

.docs-roadmap {
  margin: 0 (-$gap);

  &__columns {
    margin: calc($gap / 2);
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .docs-roadmap__column {
      background-color: var(--va-background);
      height: 100%;

      &-wrapper {
        width: 100%;
        max-width: 300px;
        flex: 1;
        margin: calc($gap / 2);
      }

      & > *:not(h6) {
        margin-bottom: $gap;
      }

      .docs-roadmap__image {
        display: flex;
        justify-content: center;

        svg {
          max-height: 150px;
          max-width: 200px;
          height: 100%;
          width: 200%;
        }
      }
    }
  }
}
</style>
