<script setup lang="ts">
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

</script>

<template>
  <VaContent>
    <MarkdownView class="va-text" :content="text" />
  </VaContent>
</template>
