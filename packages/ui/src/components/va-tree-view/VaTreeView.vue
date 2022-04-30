<template>
  <div class="va-tree-view">
    <va-tree-node
        v-for="node in items"
        :key="node.id"
        :nodes="items"
        :current-node="node"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-tree-node>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, ref } from 'vue'
import { TreeNode, TreeViewKey, TreeViewProvide } from './types'
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
      type: Function,
      default: () => undefined,
    },
  },

  components: {
    VaTreeNode,
  },

  setup: (props) => {
    const nodes = ref<TreeNode[]>(props.nodes)

    const getNodeObject = (node: TreeNode, children: TreeNode[] = []) => ({
      ...node,
      children,
      expanded: props.expandAll,
      selected: false,
      disabled: false,
      parent: children.length ? node : null,
    })

    const addProps = (nodes: TreeNode[]): any => {
      return nodes.map((node: TreeNode) => {
        if (node.children?.length) {
          return getNodeObject(node, addProps(node.children))
        }

        return getNodeObject(node)
      })
    }

    const toggleNode = (node: TreeNode) => {
      node.expanded = !node.expanded
    }

    const toggleSelect = (isSelected: boolean, node: TreeNode) => {
      const toggleChildNodeSelect = (nodes: TreeNode[]) => {
        nodes.forEach((childNode: TreeNode) => {
          childNode.selected = isSelected

          if (childNode.children.length) {
            toggleChildNodeSelect(childNode.children)
          }
        })
      }

      if (props.selectionType === 'leaf' && node.children.length) {
        toggleChildNodeSelect(node.children)
      }

      node.selected = isSelected
    }

    const treeView: TreeViewProvide = {
      nodeKey: props.nodeKey,
      selectable: props.selectable,
      toggleNode,
      toggleSelect,
    }

    provide(TreeViewKey, treeView)

    nodes.value = addProps(nodes.value)

    return {
      items: nodes,
      treeView,
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
