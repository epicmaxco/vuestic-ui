<template>
  <MarkdownView
    class="va-typography-block"
    :content="text"
  />
</template>

<script setup lang="ts">
  import { MarkdownView } from '../shared/markdown'

  defineProps({
    text: {
      type: String,
      required: true,
    }
  })
</script>
