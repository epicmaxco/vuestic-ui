<script setup lang="ts">
import { PropType } from 'vue';
import PageConfigBlocks from './PageConfigBlocks.vue';
import { PageConfigOptions } from './';

const props = defineProps({
  pageConfig: {
    type: Object as PropType<PageConfigOptions>,
    required: true
  }
})

if (props.pageConfig.head) {
  useHead(props.pageConfig.head)
}
</script>

<template>
  <PageConfigBlocks :blocks="pageConfig.blocks" />
</template>
