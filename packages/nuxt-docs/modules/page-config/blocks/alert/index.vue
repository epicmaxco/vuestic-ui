<script setup lang="ts">
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'info'
  }
})

const { t } = useI18n()
</script>

<template>
  <va-alert :color="color">
    <MarkdownView :content="t(text)" />
  </va-alert>
</template>
