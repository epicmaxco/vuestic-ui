<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigSubtitle } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigSubtitle>>,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <h3>
    {{ tie(config.text) }}
  </h3>
</template>
