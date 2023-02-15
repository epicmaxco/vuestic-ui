<script setup lang="ts">
import { type PropType } from 'vue'
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: Array as PropType<string[]>,
    required: true
  }
})

const { t } = useI18n()

const translateAndMark = (translations: string[]): string => {
  return translations
    .map((text: string): string => `- ${t(text)}`)
    .join('\n')
}
</script>

<template>
  <MarkdownView :content="translateAndMark(props.text)" />
</template>
