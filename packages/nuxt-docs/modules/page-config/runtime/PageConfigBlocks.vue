<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigOptions, Block, UnwrapPageConfigBlock } from './';

defineProps({
  blocks: {
    type: Object as PropType<PageConfigOptions['blocks']>,
    required: true
  }
})

const resolveComponent = (block: Block) => {
  return (block as UnwrapPageConfigBlock<Block>)._blockComponent
}

const omitObject = (obj: Record<string, any>, keys: string[]) => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

const resolveProps = (block: Block) => {
  return omitObject(block, ['type', '_blockComponent'])
}
</script>

<template>
  <component
    v-for="block in blocks"
    :is="resolveComponent(block)"
    v-bind="resolveProps(block)"
   />
</template>
