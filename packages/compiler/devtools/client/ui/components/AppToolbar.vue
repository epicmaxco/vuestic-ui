<script setup lang="ts">
  import { VaCard, VaButton, VaDropdown, VaDropdownContent } from 'vuestic-ui';
  import LayoutEditor from './toolbar/LayoutEditor.vue';
  import ComponentSelect from './toolbar/ComponentSelect.vue';
  import { useComponent } from '../composables/useComponent';

  const { deleteComponent } = useComponent()

  const removeComponent = async () => {
    await deleteComponent()
  }
</script>

<template>
  <VaCard color="backgroundBorder" class="app-toolbar">
    <VaDropdown :close-on-content-click="false" :keep-anchor-width="false" :offset="4">
      <template #anchor>
        <VaButton preset="secondary" icon="add" color="onBackgroundBorder">Add child component</VaButton>
      </template>

      <template #default="{ hide }">
        <VaDropdownContent background="backgroundElement">
          <ComponentSelect @component-added="hide" />
        </VaDropdownContent>
      </template>
    </VaDropdown>

    <VaDropdown :close-on-content-click="false" :keep-anchor-width="false" :offset="4">
      <template #anchor>
        <VaButton preset="secondary" icon="dashboard" color="onBackgroundBorder">Layout</VaButton>
      </template>

      <VaDropdownContent>
        <LayoutEditor />
      </VaDropdownContent>
    </VaDropdown>

    <VaButton preset="secondary" icon="delete" color="onBackgroundBorder" @click="removeComponent()">Remove component</VaButton>
  </VaCard>
</template>

<style lang="scss" scoped>
  .app-toolbar {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: max-content;
  }
</style>
