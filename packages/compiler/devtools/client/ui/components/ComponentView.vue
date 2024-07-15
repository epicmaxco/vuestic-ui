<script setup lang="ts">
  import {  VaButton, VaSpacer, VaSelect, VaTabs, VaTab } from 'vuestic-ui'
  import { ref, watch, computed } from 'vue';
  import CodeView from './base/CodeView.vue';
  import { useComponent } from '../composables/useComponent/useComponent'
  import ComponentProps from './component-options/ComponentProps.vue'
  import ComponentSlots from './component-options/ComponentSlots.vue';
  import History from './History.vue';
  import { useSelectedAppTreeItem } from '../composables/useAppTree/index';

   const {
    name,
    saveSource,
    source,
    openInVSCode,
    props, slots,
    isParsed,
  } = useComponent()

  const { sameNodeItems, selectedAppTreeItem, selectAppTreeItem } = useSelectedAppTreeItem()

  const isLoading = ref(false)

  const onSave = async () => {
    isLoading.value = true
    await saveSource(source.value!)
    isLoading.value = false
  }

  const autoSave = ref(false)

  watch(source, async (newSource) => {
    if (autoSave.value && newSource) {
      await saveSource(newSource)
    }
  })

  const tabs = computed(() => {
    return [
      { name: 'Props', disabled: Object.keys(props.value).length === 0 },
      { name: 'Slots', disabled: slots.value.length === 0 },
      { name: 'Layout', disabled: true },
      { name: 'Source Code', disabled: source.value === null },
    ]
  })

  const tab = ref(0)

  watch(isParsed, (isParsed) => {
    if (tabs.value[tab.value].disabled && isParsed) {
      tab.value = tabs.value.findIndex(tab => !tab.disabled)
    }
  })
</script>

<template>
  <div class="c-component-view">
    <div class="c-component-view__toolbar">
      <History />
      <VaButton icon="save" preset="primary" @click="onSave" :loading="isLoading" />
    </div>

    <div class="c-component-view__toolbar">
      <template v-if="sameNodeItems.length === 1">
        <h1>{{ name }}</h1>
      </template>
      <template v-else>
        <template v-for="item, index in sameNodeItems">
          <VaButton preset="secondary" :color="item === selectedAppTreeItem ? 'primary' : 'secondary'" @click="selectAppTreeItem(item)">
            {{ item.name }}
          </VaButton>
          <template v-if="index < sameNodeItems.length - 1">/</template>
        </template>
      </template>

      <VaSpacer />
      <VaButton icon="open_in_new" @click="openInVSCode" preset="primary" title="Open in VSCode" />
    </div>

    <div class="c-component-view__content">
      <VaTabs v-model="tab" #tabs class="c-component-view__tabs">
        <VaTab v-for="tab in tabs" :disabled="tab.disabled">{{ tab.name }}</VaTab>
      </VaTabs>
      <div class="c-component-view__tabs-content">
        <ComponentProps v-if="tab === 0" />
        <ComponentSlots v-else-if="tab === 1" />
        <CodeView v-else-if="tab === 3 && source !== null" v-model:code="source" />
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
    width: 500px;
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
