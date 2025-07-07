<script setup lang="ts">
import { toNodeChildren } from '../../../utils/headless'

const props = defineProps({
  perGroup: {
    type: Number,
    default: 2,
  },
})

const groupNodes = (elements: any[]) => {
  return elements.reduce((acc: any[], el: any, index: number) => {
    if (index % props.perGroup === 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(el)
    return acc
  }, []) as any[][]
}
</script>

<template>
  <div v-bind="$attrs" class="va-carousel-group" v-for="group in groupNodes(toNodeChildren($slots.default?.()))" :key="group.map((item: any) => item.key).join('-')">
    <component
      v-for="(item) in group"
      :key="item.key"
      :is="item"
    />
  </div>
</template>

<style lang="scss">
.va-carousel-group {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>
