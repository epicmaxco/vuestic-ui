<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfig } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfig>>,
    required: true
  }
})
</script>

<template>
  <div>
    {{ config.code }}
  </div>
</template>
