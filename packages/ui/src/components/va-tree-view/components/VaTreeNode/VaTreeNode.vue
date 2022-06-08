<template>
  <div class="va-tree-node">
    <div
      class="va-tree-node-root va-tree-node-root--selectable"
      @click.stop="toggleNode($props.node)"
    >
      <div class="va-tree-node-content" :class="gapClassComputed">
        <div
          v-if="$props.node.hasChildren"
          class="va-tree-node-content__item va-tree-node-content__item--leaf"
        >
          <slot v-bind="$props.node" name="node-icon-toggle">
            <va-icon
              :name="isExpandedComputed ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
              size="20px"
            />
          </slot>
        </div>
        <div
          v-if="selectable"
          class="va-tree-node-content__item"
          @click.stop
        >
          <slot name="node-checkbox">
            <va-checkbox
              v-model="$props.node.selected"
              :color="colorComputed"
              @update:model-value="(isSelected) => toggleSelect($props.node, isSelected)"
            />
          </slot>
        </div>
        <div v-if="hasIconComputed" class="va-tree-node-content__item">
          <slot name="node-icon" v-bind="$props.node"></slot>
        </div>
        <div class="va-tree-node-content__body">
          <slot name="node-body" v-bind="$props.node">{{ labelComputed }}</slot>
        </div>
      </div>
    </div>
    <div
      v-if="$props.node.hasChildren"
      class="va-tree-node-children"
      :class="expandedClassComputed"
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
import { defineComponent, inject, computed, PropType } from 'vue'

import VaIcon from '../../../va-icon'
import VaCheckbox from '../../../va-checkbox'
import { TreeViewKey, TreeNode, TreeViewProvide } from '../../types'

export default defineComponent({
  name: 'VaTreeNode',

  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
      default: () => ({}),
    },
  },

  components: { VaCheckbox, VaIcon },

  setup: (props, { slots }) => {
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

    const labelComputed = computed(() => props.node[nodeKey] || '')
    const isExpandedComputed = computed(() => props.node.expanded)
    const hasIconComputed = computed(() => slots['node-icon'] && props.node.icon)
    const expandedClassComputed = computed(
      () => ({
        'va-tree-node-children--expanded': isExpandedComputed.value,
      }),
    )
    const gapClassComputed = computed(
      () => ({
        'va-tree-node-content--indent': (selectable || hasIconComputed) &&
          props.node.hasChildren === false,
      }),
    )

    return {
      iconColor,
      treeItems,
      selectable,

      toggleNode,
      toggleSelect,

      labelComputed,
      colorComputed,
      hasIconComputed,
      gapClassComputed,
      isExpandedComputed,
      expandedClassComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources/index";
@import 'variables';

%va-tree-node-content-item {
  flex: var(--va-tree-node-content-item-flex);
  min-width: var(--va-tree-node-indent);
}

.va-tree-node {
  &-root {
    display: flex;
    padding: var(--va-tree-node-padding);

    &--selectable {
      position: relative;

      &::before {
        content: "";
        background-color: var(--va-primary);
        border-radius: var(--va-tree-node-border-radius);
        bottom: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover::before,
      &:focus::before {
        opacity: 0.1;
      }
    }
  }

  &-content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;

    &__item {
      @extend %va-tree-node-content-item;

      &--leaf {
        cursor: pointer;
      }
    }

    &__body {
      flex: var(--va-tree-node-content-body-item-flex);
      width: 100%;
    }

    &--indent {
      margin-left: var(--va-tree-node-indent);
    }
  }

  &-children {
    display: none;
    background-image: linear-gradient(#adb3b9 33%, rgba(255, 255, 255, 0) 0%);
    background-position: 15px;
    background-size: 1px 3px;
    background-repeat: repeat-y;
    padding-left: var(--va-tree-node-indent);
    width: 100%;

    &--expanded {
      display: block;
    }
  }
}
</style>
