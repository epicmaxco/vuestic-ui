<script setup lang="ts">
import { AppTreeItemComponent, useAppTree } from '../../composables/useAppTree';

const props = defineProps<{
  nodes: AppTreeItemComponent[]
}>()

const { sameNodeItems, selectedAppTreeItem, selectAppTreeItem } = useAppTree()
</script>

<template>
  <template v-if="$props.nodes.length < 3">
    <template v-for="item, index in $props.nodes">
      <VaButton preset="secondary" :color="item === selectedAppTreeItem ? 'primary' : 'secondary'" @click="selectAppTreeItem(item)">
        {{ item.name }}
      </VaButton>
      <template v-if="index < sameNodeItems.length - 1">/</template>
    </template>
  </template>
  <template v-else>
    <VaSelect
      :options="$props.nodes"
      text-by="name"
      :model-value="selectedAppTreeItem"
      @update:model-value="(item) => selectAppTreeItem(item)"
    />
  </template>
</template>
