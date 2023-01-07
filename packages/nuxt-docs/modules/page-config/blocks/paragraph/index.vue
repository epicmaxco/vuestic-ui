<script setup lang="ts">
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <va-content>
    <MarkdownView :content="tie(text)" />
  </va-content>
</template>
