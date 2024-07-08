<script setup lang="ts">
  import { useVueElement } from '../composables/useVueElement' 
  import { VaDivider, VaButton, VaIcon, VaMenu, VaMenuItem } from 'vuestic-ui'
  import ComponentViewSettings from './ComponentViewSettings.vue'
  import ComponentViewSource from './ComponentViewSource.vue'
  import { ref, computed } from 'vue';
  import CodeView from './base/CodeView.vue';

   const {
    name,
    save,
    newSource,
    source,
    autoSave,
  } = useVueElement()

  const isLoading = ref(false)

  const onSave = async () => {
    isLoading.value = true
    await save()
    isLoading.value = false
  }

  const hasChanges = computed(() => source.value !== newSource.value)

  const showDetails = ref(false)
</script>

<template>
  <div class="c-component-view">
    <h3 class="c-component-view__title">      
      {{ name }}
      <VaMenu>
        <template #anchor>
          <VaButton icon="settings" preset="primary" size="small" />
        </template>

        <VaMenuItem @click="autoSave = !autoSave" icon="save">
          Auto Save {{ autoSave ? 'On' : 'Off' }}
        </VaMenuItem>
      </VaMenu>
    </h3>

    <div class="c-component-view__content">
      <template v-if="newSource && showDetails">
        <CodeView :code="newSource" />
        <VaDivider vertical />
      </template>
      <ComponentViewSettings />
    </div>

    <div class="c-component-view__footer">
      <VaButton icon="code" preset="secondary" @click="showDetails = !showDetails" />
      <VaButton :disabled="autoSave" @click="onSave">Save</VaButton>
    </div>
  </div>
</template>

<style scoped>
  .c-component-view {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2rem);
  }

  .c-component-view__title {
    margin: 0;
    padding: 1rem;
    background: var(--va-background-element);
    display: flex;
    justify-content: space-between;
  }

  .c-component-view__tabs {
    padding-top: 0.5rem;
  }

  .c-component-view__content {
    padding: 1rem;
    display: flex;
    flex: 1;
    overflow: auto;
  }

  .c-component-view__footer {
    padding: 1rem;
    background: var(--va-background-element);
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>
