<script setup lang="ts">
import { Anchor } from '../shared/anchor'
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

</script>

<template>
  <h3 class="page-config-headline flex">
    <MarkdownView
      :content="text"
      text
      class="mr-1"
    />
    <Anchor :text="text" />
  </h3>
</template>

<style lang="scss" scoped>
.page-config-headline {
  font-size: 1.5rem;
  line-height: 1.75rem;
}
</style>
