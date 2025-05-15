<script setup lang="ts">
import { toNodeChildren } from '../../../utils/headless';

const props = defineProps({
  perGroup: {
    type: Number,
    default: 2,
  },
})

const group = (elements: any[]) => {
  return elements.reduce((acc: any[], el: any, index: number) => {
    if (index % props.perGroup === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(el);
    return acc;
  }, []);
}
</script>

<template>
  <template v-if="$slots.default">
    <div class="va-carousel-group" v-for="group in group(toNodeChildren($slots.default()))">
      <component
        v-for="(item, index) in group"
        :key="item.key"
        :is="item"
      />
    </div>
  </template>
</template>

<style lang="scss">
  .va-carousel-group {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 100%;
  }
</style>
