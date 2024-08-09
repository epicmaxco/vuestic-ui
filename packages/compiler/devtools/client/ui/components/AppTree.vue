<script setup lang="ts">
  import { VaInput, VaIcon } from 'vuestic-ui';
  import { type AppTreeItem, useAppTree } from '../composables/useAppTree/useAppTree'
  import AppTreeItemComponent from './AppTreeItem.vue'
  import { ref, computed } from 'vue'

  const { appTree } = useAppTree()

  const filter = ref('')

  const findTree = (query: string) => {
    if (!appTree.value) return

    const items = [] as AppTreeItem[]

    const find = (nodes: AppTreeItem[]) => {
      nodes.forEach((node) => {
        if ('text' in node) { return }

          if (node.name.toLowerCase().includes(query.toLowerCase())) {
            items.push({
              ...node,
              children: []
            })
          }

          if (node.children) {
            find(node.children)
          }
      })
    }

    find(appTree.value)

    return items
  }

  const foundItems = computed(() => {
    return findTree(filter.value)
  })
</script>

<template>
  <div v-if="appTree" class="va-devtools-app-tree">
    <VaInput v-model="filter" inner-label style="width: 100%" placeholder="Search">
      <template #prependInner>
        <VaIcon name="search" />
      </template>
    </VaInput>

    <div v-if="filter.length <= 0" class="va-devtools-app-tree__items">
      <div v-for="node in appTree">
        <AppTreeItemComponent :item="node" />
      </div>
    </div>
    <template v-else>
      <div v-for="node in foundItems" class="va-devtools-app-tree__items">
        <AppTreeItemComponent :item="node" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .va-devtools-app-tree {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__items {
      flex: 1;
      padding: 0.5rem 1rem;
      overflow: auto;
    }
  }
</style>
