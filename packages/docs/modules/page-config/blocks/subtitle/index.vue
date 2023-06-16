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
  <h2 class="page-config-subtitle flex">
    <MarkdownView
      :content="text"
      text
      class="mr-1"
    />
    <Anchor :text="text" />
  </h2>
</template>

<style lang="scss" scoped>
.page-config-subtitle {
  --code-bg: transparent;

  font-size: 2rem;
  line-height: 2.5rem;

  @media screen and (max-width: 767px) {
    font-size: 1.5rem !important;
    line-height: 2rem;
    margin-top: 2rem;
  }
}
</style>
