<script setup lang="ts">
import { type PropType } from 'vue'
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: Array as PropType<string[]>,
    required: true
  }
})

const mark = (strings: string[]): string => {
  return strings
    .map((text: string): string => `- ${text}`)
    .join('\n')
}
</script>

<template>
  <MarkdownView :content="mark(props.text)" />
</template>
