<script setup lang="ts">
  import { computed } from 'vue'
  import { VaButton } from 'vuestic-ui'
  import { useAppTree, type AppTreeItem } from '../composables/useAppTree'

  const props = defineProps<{
    item: AppTreeItem
  }>()

  defineOptions({
    name: 'AppTreeItem'
  })

  const { selectAppTreeItem,  selectedAppTreeItem } = useAppTree()

  const setTargetElement = () => {
    if ('text' in props.item) {
      return
    }

    if (!props.item.el) {
      throw new Error('Element is not found')
    }

    selectAppTreeItem(props.item)
  }

  // Compare el path with target element path
  // May be v-for elements or reused component, so we need to compare all paths
  const isElementSelected = computed(() => {
    return selectedAppTreeItem.value === props.item
  })
</script>

<template>
  <!-- <template v-if="props.item.type === 'native:element' && props.item.children" >
    <AppTreeItem
      v-for="node in props.item.children"
      :key="node.name"
      :item="node"
    />
  </template> -->
  <div v-if="'text' in props.item">

  </div>
  <div v-else class="app-tree-item">
    <VaButton
      class="app-tree-item__button"
      preset="secondary"
      :color="isElementSelected ? 'primary' : 'secondary'"
      :class="{
        'app-tree-item__button--selected': isElementSelected,
      }"
      @click="setTargetElement"
    >
      {{ props.item.name }}
      <template v-if="props.item.repeated">
        (repeated)
      </template>
    </VaButton>
    <div v-if="'children' in props.item" class="app-tree-item__children">
      <AppTreeItem v-if="props.item.children" v-for="node in props.item.children" :item="node" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .app-tree-item {
    &__children {
      padding: 0 0 0 1rem;
      border-left: 1px dashed var(--va-background-border);
    }

    &__button {
      margin-left: -1rem;
    }
  }
</style>
