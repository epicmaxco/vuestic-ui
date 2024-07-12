<script setup lang="ts">
  import { computed } from 'vue'
  import { VaButton} from 'vuestic-ui'
  import { type AppTreeItem } from '../composables/useAppTree'
  import { useTargetElementStore } from '../store/useTargetElementStore';
  import { useComponent } from '../composables/useComponent';
  import { getElementMinfiedPaths } from '../composables/useComponent/useComponentPaths'

  const props = defineProps<{
    item: AppTreeItem
  }>()

  defineOptions({
    name: 'AppTreeItem'
  })

  const { vNode, selectedPath } = useComponent()
  const { targetElement } = useTargetElementStore()

  const setTargetElement = () => {
    targetElement.value = props.item.el
  }

  // Compare el path with target element path
  // May be v-for elements or reused component, so we need to compare all paths
  const isElementSelected = computed(() => {
    if (!vNode.value) return false

    const paths = getElementMinfiedPaths(props.item.el)
    const targetElPaths = getElementMinfiedPaths(targetElement.value)

    return paths?.some(path => path === selectedPath.value?.minified)
  })
</script>

<template>
  <template v-if="props.item.type === 'native:element' && props.item.children" >
    <AppTreeItem
      v-for="node in props.item.children"
      :key="node.name"
      :item="node"
    />
  </template>
  <div v-else class="app-tree-item">
    <VaButton
      class="app-tree-item__button"
      preset="secondary"
      :color="isElementSelected ? 'primary' : 'secondary'"
      :class="{
        'app-tree-item__button--selected': isElementSelected,
        'app-tree-item__button--component': props.item.type === 'vue:component',
        'app-tree-item__button--element': props.item.type === 'native:element'
      }"
      @click="setTargetElement"
    >
      {{ props.item.name }}
      <template v-if="props.item.vFor">
        (repeated)
      </template>
    </VaButton>
    <div v-if="'children' in props.item" class="app-tree-item__children">
      <AppTreeItem v-if="props.item.children" v-for="node in props.item.children" :key="node.name" :item="node" />
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
