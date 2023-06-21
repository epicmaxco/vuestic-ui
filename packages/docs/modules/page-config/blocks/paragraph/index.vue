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
  <va-content>
    <MarkdownView :content="text" />
  </va-content>
</template>
