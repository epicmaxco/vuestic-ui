<script setup lang="ts">
  import {  VaButton, VaSpacer, VaTabs, VaTab } from 'vuestic-ui'
  import { ref, watch, computed } from 'vue';
  import { useComponent } from '../composables/useComponent/useComponent'
  import ComponentProps from './component-options/ComponentProps.vue'
  import ComponentSlots from './component-options/ComponentSlots.vue';
  import ComponentSource from './component-options/ComponentSource.vue';
  import ComponentFile from './component-options/ComponentFile.vue';
  import LayoutEditor from './layout-editor/LayoutEditor.vue';
  import { useAppTree } from '../composables/useAppTree';

   const {
    name,
    source,
    code,
    options,
  } = useComponent()

  const { sameNodeItems, selectedAppTreeItem, selectAppTreeItem } = useAppTree()

  const tabs = computed(() => {
    return [
      { name: 'Props', disabled: Object.keys(options.props.value).length === 0 },
      { name: 'Slots', disabled: options.slots.value.length === 0 },
      { name: 'Layout', disabled: false },
      { name: 'Source Code', disabled: source.value === null },
    ]
  })

  const tab = ref(0)

  watch(code.isParsed, (isParsed) => {
    if (tabs.value[tab.value].disabled && isParsed) {
      tab.value = tabs.value.findIndex(tab => !tab.disabled)
    }
  })
</script>

<template>
  <div class="c-component-view">
    <div class="c-component-view__toolbar">
      <template v-if="sameNodeItems.length === 1">
        <h1>{{ name }}</h1>
      </template>
      <template v-else>
        <ComponentFile :nodes="sameNodeItems" />
      </template>

      <VaSpacer />
      <VaButton icon="open_in_new" @click="source.openInVSCode" preset="primary" title="Open in VSCode" />
    </div>

    <div class="c-component-view__content">
      <VaTabs v-model="tab" #tabs class="c-component-view__tabs">
        <VaTab v-for="tab in tabs" :disabled="tab.disabled">{{ tab.name }}</VaTab>
      </VaTabs>
      <div class="c-component-view__tabs-content">
        <ComponentProps v-if="tab === 0" />
        <ComponentSlots v-else-if="tab === 1" />
        <LayoutEditor v-else-if="tab === 2" />
        <ComponentSource v-else-if="tab === 3" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .c-component-view {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2rem);

    &__tabs {
      width: 100%;
    }

    &__tabs-content {
      padding-top: 1rem;
      flex: 1;
    }
  }

  .c-component-view__content {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    max-width: 100%;
  }

  .c-component-view__toolbar {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    background: var(--va-background-element);

    h1 {
      font-size: 18px;
    }
  }
</style>
