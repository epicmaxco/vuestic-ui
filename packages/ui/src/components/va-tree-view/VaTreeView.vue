<template>
  <div class="va-tree-view" role="tree">
    <template v-if="$props.filter && !treeItems.length">
      <slot name="not-found">No matching nodes found</slot>
    </template>
    <template v-else>
      <va-tree-node
        v-for="nodeItem in treeItems"
        :key="getKey(nodeItem)"
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
import { defineComponent, provide, ref, toRefs, computed, PropType } from 'vue'
import { useColors, useTextColor } from '../../composables/'

import { TreeViewKey, TreeNode } from './types'
import useTreeBuilder, { TreeViewFilterMethod } from './hooks/useTreeBuilder'

import { VaTreeNode } from './components/VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: {
    nodes: {
      type: Array as PropType<TreeNode[]>,
      default: () => ([]),
    },
    modelValue: {
      type: Array as PropType<(number | string)[]>,
      default: () => ([]),
    },
    color: {
      type: String,
      default: 'primary',
    },
    trackBy: {
      type: String,
      default: 'id',
    },
    textBy: {
      type: String,
      default: 'label',
    },
    valueBy: {
      type: String,
      default: '',
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
    filterMethod: {
      type: Function as PropType<TreeViewFilterMethod>,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  components: { VaTreeNode },

  setup: (props, { emit }) => {
    const selectedNodes = ref(new Set())
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const { textColorComputed } = useTextColor(colorComputed)
    const { treeItems } = useTreeBuilder(toRefs(props))

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

    const getKey = (node: TreeNode) => node[props.trackBy]

    provide(TreeViewKey, {
      colorComputed,
      iconColor: textColorComputed,
      trackBy: props.trackBy,
      textBy: props.textBy,
      selectable: props.selectable,
      getKey,
      toggleNode,
      toggleCheckbox,
    })

    return { treeItems, getKey }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-view {
  padding: var(--va-tree-view-padding);
}
</style>
