<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue';
import { PageConfigComponent } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigComponent>>,
    required: true
  }
})

const c = props.config.component
</script>

<template>
  <component :is="c" />
</template>