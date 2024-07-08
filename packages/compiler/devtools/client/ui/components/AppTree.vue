<script setup lang="ts">
  import { useAppTree } from '../composables/useAppTree'
  import AppTreeItem from './AppTreeItem.vue'

  const { appTree, refresh } = useAppTree()
</script>

<template>
  <div v-if="appTree">
    <div v-for="node in appTree.children" :key="node.name">
      <AppTreeItem :item="node" />
    </div>
  </div>
</template>
