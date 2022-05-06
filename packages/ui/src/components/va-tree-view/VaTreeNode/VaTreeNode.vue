<template>
  <div class="va-tree-node">
    <div
      class="va-tree-node-header"
      @click.stop="toggleNode($props.node)"
    >
      <div
        v-if="$props.node.hasChildren"
        class="va-tree-node-header__item"
      >
        <slot name="node-icon-toggle" v-bind="$props.node">
          <button style="height: 1rem; width: 1rem; line-height: 1rem;">
            {{ $props.node.expanded ? '-' : '+' }}
          </button>
        </slot>
      </div>
      <div class="va-tree-node-header__item" v-if="selectable" @click.stop>
        <va-checkbox
          v-model="$props.node.selected"
          :color="colorComputed"
          @update:model-value="(isSelected) => toggleSelect($props.node, isSelected)"
        />
      </div>
      <div class="va-tree-node-header__item">
        <slot name="node-header" v-bind="$props.node">
          {{ label }}
        </slot>
      </div>
    </div>
    <div class="va-tree-node-body">
      <slot name="node-body" v-bind="$props.node"></slot>
    </div>
    <div
      v-show="$props.node.expanded"
      class="va-tree-node-children"
    >
      <va-tree-node
        v-for="childNode in $props.node.children"
        :key="childNode.id"
        :node="childNode"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-tree-node>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from 'vue'
import { TreeNode, TreeViewKey, TreeViewProvide } from '../types'
import VaCheckbox from '../../va-checkbox'

export default defineComponent({
  name: 'VaTreeNode',

  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
      default: () => ({}),
    },
  },

  components: {
    VaCheckbox,
  },

  setup: (props) => {
    let nodes: TreeNode[] = []
    const {
      nodeKey,
      iconColor,
      treeItems,
      selectable,
      toggleNode,
      toggleSelect,
      colorComputed,
    } = inject<TreeViewProvide>(TreeViewKey, {
      iconColor: computed(() => 'var(--va-white)'),
      colorComputed: computed(() => 'primary'),
      treeItems: computed({
        get: () => nodes,
        set: (value: TreeNode[]) => {
          nodes = value
        },
      }),
      nodeKey: '',
      selectable: false,
      toggleNode: (node: TreeNode) => node,
      toggleSelect: (node: TreeNode, isSelected: boolean) => ({ node, isSelected }),
    })

    const label = ref(props.node[nodeKey] || '')

    return {
      label,
      nodeKey,
      iconColor,
      treeItems,
      selectable,
      toggleNode,
      toggleSelect,
      colorComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
@import 'variables';

:root {
  --va-tree-node-margin-top: 1rem;
}

.va-tree-node {
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  &-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;

    &__item + .va-tree-node-header__item {
      margin-left: 0.5rem;
    }
  }

  &-body {}

  &-children {
    background-image: linear-gradient(#adb3b9 33%, rgba(255, 255, 255, 0) 0%);
    background-position: left;
    background-size: 1px 3px;
    background-repeat: repeat-y;
    padding-left: 1.85rem;
  }
}
</style>
