<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigTitle } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigTitle>>,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <h1>
    {{ tie(props.config.text) }}
  </h1>
</template>
