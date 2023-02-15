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
  <h1 class="page-config-title">
    <MarkdownView
      :content="t(text)"
      text
      class="mr-2"
    />
    <Anchor :text="text" />
  </h1>
</template>

<style lang="scss">
  .page-config-title {
    --code-bg: transparent;

    @media screen and (max-width: 767px) {
      font-size: 2rem !important;    
    }
  }
</style>
