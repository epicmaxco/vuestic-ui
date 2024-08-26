<script setup lang="ts">
import { useComponent } from '../../composables/useComponent';
import CodeView from '../base/CodeView.vue';
import { ref, watch } from 'vue';

const { source } = useComponent()

const isLoading = ref(false)
const newSource = ref('')

watch(source.content, (newNewSource) => {
  newSource.value = newNewSource ?? ''
}, { immediate: true })

const save = () => {
  if (!source.content.value) return
  try {
    isLoading.value = true
    source.update(newSource.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="va-devtools-source-code">
    <div class="va-devtools-source-code__toolbar">
      <div class="va-devtools-source-code__file-name">
        {{ source.fileName }}
      </div>
      <VaButton preset="secondary" icon="save" :loading="isLoading" @click="save" />
    </div>
  </div>
  <div class="va-devtools-source-code__code">
    <CodeView v-if="source !== null" v-model:code="newSource" />
  </div>
</template>

<style lang="scss" scoped>
  .va-devtools-source-code {
    --border-radius: 4px;

    &__toolbar {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      background: var(--va-background-border);
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }

    &__file-name {
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      flex: 1;
      padding: 0 0.5rem;
    }

    &__code {
      overflow: auto;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }
</style>
