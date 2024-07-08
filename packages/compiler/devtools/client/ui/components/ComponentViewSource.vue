<script setup lang="ts">
  import { VaButton } from 'vuestic-ui';
  import { useVueElement } from '../composables/useVueElement' 
  import SourceView from './base/SourceView.vue'
  import { computed, ref, type Ref } from 'vue';

   const {
    name,
    source,
    newSource,
    meta,
    parsed,
  } = useVueElement()

  const view = ref('new code') as Ref<'new code' | 'original code' | 'ast'>

  const tree = computed(() => {
    if (!parsed.value) { return null }

    return parsed.value
  })
</script>

<template>
  <div class="c-component-view-source">
    <div class="c-component-view-source__toolbar">
      <VaButton @click="view = 'original code'" preset="primary" :color="view === 'original code' ? 'primary' : 'secondary'">
        Original Code
      </VaButton>
      <VaButton @click="view = 'new code'" preset="primary" :color="view === 'new code' ? 'primary' : 'secondary'">
        New Code
      </VaButton>
      <VaButton @click="view = 'ast'" preset="primary" :color="view === 'ast' ? 'primary' : 'secondary'">
        AST
      </VaButton>
    </div>
    <div class="c-component-view-source__content" v-if="source && newSource">
      <SourceView class="c-component-view-source__source" :source="source" v-if="view === 'original code'" />
      <SourceView class="c-component-view-source__source" :source="newSource" v-else-if="view === 'new code'" />
    </div>
  </div>
</template>

<style scoped>
  .c-component-view-source__content {
    display: flex;
    gap: 1rem;
    flex: 1;
    flex-direction: column;
  }

  .c-component-view-source__source {
    flex: 1;
    background: var(--va-background-element);
    padding: 0 1rem;
  }

  .c-component-view-source__toolbar {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    width: max-content;
  }
</style>