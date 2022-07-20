<template>
  <div class="va-tree-view" role="tree">
    <va-tree-node
      v-for="nodeItem in treeItems"
      :key="nodeItem[$props.nodeKey]"
      :node="nodeItem"
    >
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotScope">
        <slot :name="name" v-bind="slotScope" />
      </template>
    </va-tree-node>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, watch, reactive, ref, computed, PropType } from 'vue'
import { useColors, useTextColor } from '../../composables/'

import { TreeViewKey, TreeNode, TreeViewProvide } from './types'
import useTreeBuilder from './hooks/useTreeBuilder'
import useTreeFilter from './hooks/useTreeFilter'

import { VaTreeNode } from './components/VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: {
    modelValue: {
      type: Array as PropType<(number | string)[]>,
      default: () => ([]),
    },
    color: {
      type: String,
      default: 'primary',
    },
    nodes: {
      type: Array as PropType<TreeNode[]>,
      default: () => ([]),
    },
    nodeKey: {
      type: String,
      default: '',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selectionType: {
      type: String,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v),
    },
    filter: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  components: { VaTreeNode },

  setup: (props, { emit }) => {
    const selectedNodes = ref(new Set())
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const { textColorComputed } = useTextColor(colorComputed)
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

    const toggleCheckbox = (node: TreeNode, isChecked: boolean) => {
      if (node.disabled) { return }

      const toggleChildNodeCheckbox = (nodes: TreeNode[]) => {
        nodes.forEach((childNode: TreeNode) => {
          childNode.checked = isChecked

          if (isChecked) {
            selectedNodes.value.add(childNode.id)
          } else {
            selectedNodes.value.delete(childNode.id)
          }

          emit('update:modelValue', Array.from(selectedNodes.value.values()))

          if (childNode.hasChildren) {
            toggleChildNodeCheckbox(childNode.children)
          }
        })
      }

      if (isChecked) {
        selectedNodes.value.add(node.id)
      } else {
        selectedNodes.value.delete(node.id)
      }

      emit('update:modelValue', Array.from(selectedNodes.value.values()))

      if (props.selectionType === 'leaf' && node.hasChildren) {
        toggleChildNodeCheckbox(node.children)
      }

      node.checked = isChecked
    }

    const toggleNode = (node: TreeNode): void => {
      if (node.hasChildren && !node.disabled) {
        node.expanded = !node.expanded
      }
    }

    const filterWatcher = (filterValue: string) => {
      nodeItems.list = useTreeFilter({
        filter: filterValue,
        nodes: props.nodes.slice(),
        labelKey: props.labelKey,
      })
    }

    watch(() => props.filter, filterWatcher)

    const treeView: TreeViewProvide = {
      treeItems,
      colorComputed,
      iconColor: textColorComputed,
      nodeKey: props.nodeKey,
      labelKey: props.labelKey,
      selectable: props.selectable,
      toggleNode,
      toggleCheckbox,
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
