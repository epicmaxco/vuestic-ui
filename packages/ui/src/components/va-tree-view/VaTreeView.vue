<template>
  <div class="va-tree-view" role="tree">
    <template v-if="$props.filter && !treeItems.length">
      <slot name="not-found">No matching nodes found</slot>
    </template>
    <template v-else>
      <va-tree-node
        v-for="nodeItem in treeItems"
        :key="getTrackBy(nodeItem)"
        :node="nodeItem"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotScope">
          <slot :name="name" v-bind="slotScope" />
        </template>
      </va-tree-node>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, computed, PropType } from 'vue'

import { useColors, useTextColor } from '../../composables/'

import useTreeView from './hooks/useTreeView'
import { useTreeViewProps } from './hooks/useTreeHelpers'

import { TreeViewKey, TreeNode } from './types'
import { VaTreeNode } from './components/VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: {
    ...useTreeViewProps,
    stateful: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    modelValue: {
      type: undefined as any,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },

  emits: [
    'update:modelValue',
  ],

  components: { VaTreeNode },

  setup: (props, { emit }) => {
    const selectedNodes = ref(new Set())
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const {
      treeItems,
      getText,
      getTrackBy,
      getNodeProperty,
    } = useTreeView(props)

    const toggleCheckbox = (node: TreeNode, isChecked: boolean): void => {
      if (node.disabled) { return }

      const toggleChildNodeCheckbox = (nodes: TreeNode[]): void => {
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

    provide(TreeViewKey, {
      colorComputed,
      selectable: props.selectable,
      iconBy: props.iconBy,
      getText,
      getTrackBy,
      toggleNode,
      toggleCheckbox,
      getNodeProperty,
    })

    return {
      treeItems,

      getText,
      getTrackBy,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-view {
  padding: var(--va-tree-view-padding);
}
</style>
