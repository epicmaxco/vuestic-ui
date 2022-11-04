<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigComponent } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigComponent>>,
    required: true
  }
})
</script>

<template>
  <component :is="props.config.component" v-bind="config.props" />
</template>