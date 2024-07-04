<script setup lang="ts">
  import { VaButton } from 'vuestic-ui'
  import type { AppTreeItem } from '../composables/useAppTree'  
  import { useTargetElementStore } from '../store/useTargetElementStore';

  const props = defineProps<{
    item: AppTreeItem
  }>()

  defineOptions({
    name: 'AppTreeItem'
  })

  const { targetElement } = useTargetElementStore()

  const setTargetElement = () => {
    targetElement.value = props.item.el
  }
</script>

<template>
  <template v-if="props.item.type === 'native:element' && props.item.children" >
    <AppTreeItem 
      v-for="node in props.item.children" 
      :key="node.name" 
      :item="node"
    />
  </template>
  <div v-else class="app-tree-item" >
    <VaButton
      class="app-tree-item__button"
      preset="secondary"
      :color="props.item.el === targetElement ? 'primary' : 'secondary'"
      :class="{
        'app-tree-item__button--selected': props.item.el === targetElement,
        'app-tree-item__button--component': props.item.type === 'vue:component',
        'app-tree-item__button--element': props.item.type === 'native:element'
      }"
      @click="setTargetElement"
    >
      {{ props.item.name }}
    </VaButton>
    <AppTreeItem v-if="props.item.children" v-for="node in props.item.children" :key="node.name" :item="node" />
  </div>
</template>


<style lang="scss" scoped>
  .app-tree-item {
    padding: 0 0 0 0.5rem;
  }

  // .app-tree-item__button {
  //   padding: 0.2rem 0.5rem;
  //   border: none;
  //   background-color: transparent;
  //   cursor: pointer;
  //   display: block;
  //   width: 100%;
  //   text-align: left;
  // }
</style>