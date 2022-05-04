<template>
  <div class="va-tree-view">
    <va-tree-node
        v-for="(nodeItem) in treeItems"
        :key="nodeItem.id"
        :node="nodeItem"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-tree-node>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, PropType } from 'vue'
import { TreeViewKey, TreeNode, TreeViewProvide } from './types'
import useTreeBuilder from './hooks/useTreeBuilder'
import useTreeFilter from './hooks/useTreeFilter'
import VaTreeNode from './VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: {
    color: {
      type: String,
      default: () => 'primary',
    },
    nodes: {
      type: Array as PropType<TreeNode[]>,
      default: () => ([]),
    },
    nodeKey: {
      type: String,
      required: true,
      default: () => (''),
    },
    expandAll: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    selectable: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: () => 'leaf',
    },
    filter: {
      type: String,
      default: () => '',
    },
  },

  components: {
    VaTreeNode,
  },

  setup: (props) => {
    const { treeItems } = useTreeBuilder(props)

    const toggleSelect = (node: TreeNode, isSelected: boolean) => {
      const toggleChildNodeSelect = (nodes: TreeNode[]) => {
        nodes.forEach((childNode: TreeNode) => {
          childNode.selected = isSelected

          if (childNode.hasChildren) {
            toggleChildNodeSelect(childNode.children)
          }
        })
      }

      if (props.selectionType === 'leaf' && node.hasChildren) {
        toggleChildNodeSelect(node.children)
      }

      node.selected = isSelected
    }

    const toggleNode = (node: TreeNode): void => {
      node.expanded = !node.expanded
    }

    const treeView: TreeViewProvide = {
      treeItems,
      nodeKey: props.nodeKey,
      selectable: props.selectable,
      toggleNode,
      toggleSelect,
    }

    provide(TreeViewKey, treeView)

    return {
      treeView,
      treeItems,
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
