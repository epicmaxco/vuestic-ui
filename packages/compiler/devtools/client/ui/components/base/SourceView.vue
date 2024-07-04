<script setup lang="ts">
  import CodeView from './CodeView.vue'

  const props = defineProps<{
    source: string,
    label?: string
  }>()
</script>

<template>
  <div class="va-source-view">
    <span v-if="label" class="va-title">
      Current source
    </span>
    <CodeView class="va-code-view" :code="source" />
  </div>
</template>

<style>
  .va-source-view {
    display: flex;
    flex-direction: column;
  }

  .va-code-snippet {
    font-family: monospace;
    background: var(--va-background-element);
    padding: 8px;
    margin: 0;
  }

  .va-code-view {
    padding: 0.1rem 0;
  }

  .va-code-view .material-theme-lighter {
    background: transparent !important;
  }
</style>