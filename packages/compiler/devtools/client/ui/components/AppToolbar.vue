<script setup lang="ts">
  import { ref } from 'vue';
  import { VaDivider, VaButton, VaDropdown, VaDropdownContent } from 'vuestic-ui';
  import LayoutEditor from './toolbar/LayoutEditor.vue';
  import ComponentSelect from './toolbar/ComponentSelect.vue';
  import { useComponent } from '../composables/useComponent';
  import History from './History.vue';

  const { source } = useComponent()

  const isLoading = ref(false)

  const onSave = async () => {
    isLoading.value = true
    await source.update(source.value!)
    isLoading.value = false
  }

  const removeComponent = async () => {
    try {
      isLoading.value = true
      await source.remove()
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="va-devtools-toolbar">
    <History />
    <!-- TODO: No need in dedicated save button ideally -->
    <VaButton icon="save" preset="secondary" @click="onSave" :loading="isLoading" />
    <VaDivider vertical/>
    <VaDropdown :close-on-content-click="false" :keep-anchor-width="false" :offset="4" content-class="vuestic-devtools__dropdown_content" stick-to-edges>
      <template #anchor>
        <VaButton preset="secondary" icon="add"></VaButton>
      </template>

      <template #default="{ hide }">
        <VaDropdownContent background="backgroundElement" class="app-toolbar__content">
          <ComponentSelect @component-added="hide" />
        </VaDropdownContent>
      </template>
    </VaDropdown>

    <VaButton preset="secondary" icon="delete" @click="removeComponent()" :loading="isLoading"></VaButton>
  </div>
</template>

<style lang="scss">
  .va-devtools-toolbar {
    width: max-content !important;
    display: flex;

    .va-divider {
      margin: 0;
    }
  }
</style>
