<script setup lang="ts">
  import { VaDivider, VaButton, VaSpacer, VaSelect, VaSwitch } from 'vuestic-ui'
  import { ref, watch } from 'vue';
  import CodeView from './base/CodeView.vue';
  import { useComponent } from '../composables/useComponent/useComponent'
  import ComponentSettings from './component-options/ComponentSettings.vue'

   const {
    meta,
    saveSource,
    source,
    selectedPath,
    paths,
    openInVSCode,
  } = useComponent()

  const isLoading = ref(false)

  const onSave = async () => {
    isLoading.value = true
    await saveSource(source.value!)
    isLoading.value = false
  }

  const showDetails = ref(true)

  const getFileName = (p: string) => {
    return p.split('/').pop()?.split(':').shift()
  }

  const autoSave = ref(true)

  watch(source, async (newSource) => {
    if (autoSave.value && newSource) {
      await saveSource(newSource)
    }
  })
</script>

<template>
  <div class="c-component-view">
    <h3 class="c-component-view__title">
      {{ meta.name }}

      <div class="c-component-view__title-actions">
        <VaSelect 
          v-if="paths"
          v-model="selectedPath"
          :options="paths"
          :text-by="(option) => getFileName((option as any).path)"
          style="width: 180px"
          background="backgroundPrimary"
        />
      </div>
    </h3>

    <div class="c-component-view__content">
      <template v-if="source && showDetails">
        <CodeView v-model:code="source" />
        <VaDivider vertical />
      </template>
      <ComponentSettings />
    </div>

    <div class="c-component-view__footer">
      <VaButton icon="code" preset="secondary" @click="showDetails = !showDetails" />
      <VaSpacer />
      <!-- <VaSwitch v-model="autoSave" label="Auto save" /> -->
      <VaButton icon="vscode" @click="openInVSCode" preset="secondary" title="Open in VSCode" />
      <VaButton @click="onSave">Save</VaButton>
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
    align-items: center;
  }

  .c-component-view__title-actions {
    display: flex;
    gap: 0.5rem;
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
    width: 100%;
  }
</style>
