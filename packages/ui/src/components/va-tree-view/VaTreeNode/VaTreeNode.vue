<template>
  <div class="va-tree-node">
    <div
      class="va-tree-node-header"
      @click.stop="toggleNode($props.currentNode)"
    >
      <div
        v-if="$props.currentNode.children.length"
        class="va-tree-node-header__item"
      >
        <slot name="node-icon-toggle" v-bind="currentNode">
          <button style="height: 1rem; width: 1rem; line-height: 1rem;">
            {{ $props.currentNode.expanded ? '-' : '+' }}
          </button>
        </slot>
      </div>
      <div class="va-tree-node-header__item" v-if="selectable" @click.stop>
        <va-checkbox
          v-model="$props.currentNode.selected"
          @update:model-value="(v) => toggleSelect(v, $props.currentNode)"
        />
      </div>
      <div class="va-tree-node-header__item">
        <slot name="node-header" v-bind="currentNode">
          {{ label }}
        </slot>
      </div>
    </div>
    <div class="va-tree-node-body">
      <slot name="node-body" v-bind="currentNode"></slot>
    </div>
    <div
      v-show="$props.currentNode.expanded"
      class="va-tree-node-children"
    >
      <va-tree-node
        v-for="node in childNodes"
        :key="node.id"
        :nodes="node.children"
        :current-node="node"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-tree-node>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from 'vue'
import { TreeNode, TreeViewKey, TreeViewProvide } from '../types'
import VaCheckbox from '../../va-checkbox'

export default defineComponent({
  name: 'VaTreeNode',

  props: {
    currentNode: {
      type: Object as PropType<TreeNode>,
      default: () => ({}),
    },
    nodes: {
      type: Array as PropType<TreeNode[]>,
      required: true,
      default: () => [],
    },
    color: {
      type: String,
      default: () => 'primary',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },

  components: {
    VaCheckbox,
  },

  setup: (props) => {
    const childNodes = ref(props.currentNode.children)
    const isSelected = ref(props.currentNode.selected)

    const {
      nodeKey,
      selectable,
      toggleNode,
      toggleSelect,
    } = inject<TreeViewProvide>(TreeViewKey, {
      nodeKey: '',
      selectable: false,
      toggleNode: (node: TreeNode) => node,
      toggleSelect: (isSelected: boolean, node: TreeNode) => node,
    })

    const label = ref(props.currentNode[nodeKey] || '')

    return {
      childNodes,
      label,
      isSelected,
      nodeKey,
      selectable,
      toggleNode,
      toggleSelect,
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
