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
import { defineComponent, provide, watch, reactive, ref, computed, PropType } from 'vue'
import { TreeViewKey, TreeNode, TreeViewProvide } from './types'

import useTreeBuilder from './hooks/useTreeBuilder'
import useTreeFilter from './hooks/useTreeFilter'

import { useColors } from '../../services/color-config/color-config'
import { getTextColor } from '../../services/color-config/color-functions'

import VaTreeNode from './components/VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: {
    modelValue: {
      type: Array as PropType<(number | string)[]>,
      default: () => ([]),
    },
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

  emits: ['update:modelValue'],

  components: { VaTreeNode },

  setup: (props, { emit }) => {
    const selectedNodes = ref(new Set())
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const iconColor = computed(() => getTextColor(colorComputed.value))
    const nodeItems = reactive({ list: props.nodes.slice() })
    const treeItems = computed({
      get: () => useTreeBuilder({
        nodes: nodeItems.list,
        expandAll: props.expandAll,
      }).treeItems,
      set: (value: TreeNode[]) => {
        nodeItems.list = value
      },
    })

    const toggleSelect = (node: TreeNode, isSelected: boolean) => {
      const toggleChildNodeSelect = (nodes: TreeNode[]) => {
        nodes.forEach((childNode: TreeNode) => {
          childNode.selected = isSelected

          if (isSelected) {
            selectedNodes.value.add(childNode.id)
          } else {
            selectedNodes.value.delete(childNode.id)
          }

          emit('update:modelValue', Array.from(selectedNodes.value.values()))

          if (childNode.hasChildren) {
            toggleChildNodeSelect(childNode.children)
          }
        })
      }

      if (isSelected) {
        selectedNodes.value.add(node.id)
      } else {
        selectedNodes.value.delete(node.id)
      }

      emit('update:modelValue', Array.from(selectedNodes.value.values()))

      if (props.selectionType === 'leaf' && node.hasChildren) {
        toggleChildNodeSelect(node.children)
      }

      node.selected = isSelected
    }

    const toggleNode = (node: TreeNode): void => {
      node.expanded = !node.expanded
    }

    const filterWatcher = (filterValue: string) => {
      nodeItems.list = useTreeFilter({
        filter: filterValue,
        nodes: props.nodes.slice(),
        nodeKey: props.nodeKey,
      })
    }

    watch(() => props.filter, filterWatcher)

    const treeView: TreeViewProvide = {
      colorComputed,
      iconColor,
      treeItems,
      nodeKey: props.nodeKey,
      selectable: props.selectable,
      toggleNode,
      toggleSelect,
    }

    provide(TreeViewKey, treeView)

    return { nodeItems, treeView, treeItems }
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
