<script setup lang="ts">
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'info'
  },
  solid: {
    type: Boolean,
    default: false,
  }
})

</script>

<template>
  <VaAlert
    class="page-config-alert"
    :color="color"
    :outline="!solid"
  >
    <MarkdownView :content="text" />
  </VaAlert>
</template>

<style lang="scss">
.page-config-alert {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;

  .MarkdownView {
    p {
      margin: 0;
    }
  }
}
</style>
