<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigCode } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigCode>>,
    required: true
  }
})
</script>

<template>
  <div>
    {{ config.code }}
  </div>
</template>