<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfig } from '.';
import { MarkdownView } from "../../shared/markdown";

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfig>>,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <va-alert :color="config.color">
    <MarkdownView :content="tie(config.text)" />
  </va-alert>
</template>
