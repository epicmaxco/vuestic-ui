<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigParagraph } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigParagraph>>,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <p>
    {{ tie(config.text) }}
  </p>
</template>
