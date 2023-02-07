<script setup lang="ts">
import { CodeView } from '../shared/code';

const props = defineProps({
  content: {
    type: [String, Object],
  },
  language: {
    type: String,
  },
})
</script>

<template>
  <CodeView :code="content" :language="language" />
</template>
