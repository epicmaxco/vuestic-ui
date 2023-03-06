<script setup lang="ts">
import { Anchor } from '../shared/anchor'
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
</script>

<template>
  <h2 class="page-config-subtitle">
    <MarkdownView
      :content="t(text)"
      text
      class="mr-2"
    />
    <Anchor :text="text" />
  </h2>
</template>

<style lang="scss" scoped>
.page-config-subtitle {
  --code-bg: transparent;

  font-size: 2rem;
  line-height: 2.5rem;
}
</style>
