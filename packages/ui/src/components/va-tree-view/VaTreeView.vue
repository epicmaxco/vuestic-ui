<template>
  <div class="va-tree-view">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, ref } from 'vue'
import { useColor } from '../../composables/useColor'
import { TreeCategory, TreeViewKey, TreeViewProvide } from './types'

export default defineComponent({
  name: 'VaTreeView',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  setup: (props) => {
    const categories = ref<TreeCategory[]>([])

    const collapse = () => {
      nextTick(() => {
        categories.value.forEach((child: TreeCategory) => {
          child.collapse()
        })
      })
    }

    const expand = () => {
      nextTick(() => {
        categories.value.forEach((child: TreeCategory) => {
          child.expand()
        })
      })
    }

    const onChildMounted = (category: TreeCategory) => {
      categories.value.push(category)
    }

    const onChildUnmounted = (removableCategory: TreeCategory) => {
      categories.value = categories.value.filter((category: TreeCategory) => category !== removableCategory)
    }

    const treeView: TreeViewProvide = {
      color: props.color,
      onChildMounted,
      onChildUnmounted,
    }

    provide(TreeViewKey, treeView)

    return {
      collapse,
      expand,
      ...useColor(props),
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-view {
  padding: var(--va-tree-view-padding);
  font-family: var(--va-font-family);
}
</style>
