<script setup lang="ts">
import { CodeView } from '../shared/code';

const props = defineProps({
  content: {
    type: String,
  },
  language: {
    type: String,
    default: 'javascript'
  },
})
</script>

<template>
  <CodeView :code="content" :language="language" />
</template>
