<script setup lang="ts">
import { type PropType } from 'vue';
import { BaseBlock, type PageConfigOptions } from '../../runtime';
import PageConfigBlocks from '../../runtime/PageConfigBlocks.vue';

const props = defineProps({
  blocks: {
    type: Object as PropType<(Promise<BaseBlock[]>)>,
    required: true,
  },
})

const loadedBlocks = ref<BaseBlock[] | null>(null)

watchEffect(() => {
  props.blocks.then((blocks) => {
    loadedBlocks.value = blocks
  })
})
</script>

<template>
  <PageConfigBlocks
    v-if="loadedBlocks"
    :blocks="loadedBlocks"
  />
  <PageConfigSkeleton
    v-else
    class="mt-24"
  />
</template>
