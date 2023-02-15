<script setup lang="ts">
import { DefineComponent, PropType } from 'vue';

const props = defineProps({
  component: {
    type: Object as PropType<DefineComponent>,
    required: true,
  },
  bind: {
    type: Object as PropType<Record<string, unknown>>,
    required: true,
  },
})
</script>

<template>
  <component
    :is="component"
    v-bind="bind"
  />
</template>
