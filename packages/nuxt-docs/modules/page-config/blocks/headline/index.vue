<script setup lang="ts">
import { MarkdownView } from '../shared/markdown'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
</script>

<template>
  <MarkdownView :content="`#### ${t(text)}`" />
</template>
