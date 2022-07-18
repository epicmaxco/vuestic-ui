<template>
  <div
    class="va-tree-node"
    role="treeitem"
    :aria-expanded="$props.node.expanded"
    :aria-disabled="$props.node.disabled"
    :aria-checked="$props.node.checked"
    :tabindex="tabIndexComputed"
    @keydown.right.stop.prevent="handleToggleNode($event, $props.node)"
    @keydown.left.stop.prevent="handleToggleNode($event, $props.node)"
  >
    <div
      class="va-tree-node-root"
      @click.stop="toggleNode($props.node)"
    >
      <div class="va-tree-node-content" :class="gapClassComputed">
        <div
          v-if="$props.node.hasChildren"
          class="va-tree-node-content__item va-tree-node-content__item--leaf"
        >
          <slot v-bind="$props.node" name="icon-toggle">
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
          <slot name="checkbox">
            <va-checkbox
              v-model="$props.node.checked"
              :color="colorComputed"
              @update:model-value="(isChecked) => toggleCheckbox($props.node, isChecked)"
              class="va-tree-node__checkbox"
            />
          </slot>
        </div>
        <div v-if="hasIconComputed" class="va-tree-node-content__item">
          <slot name="icon" v-bind="$props.node"></slot>
        </div>
        <div class="va-tree-node-content__body">
          <slot name="content" v-bind="$props.node">{{ labelComputed }}</slot>
        </div>
      </div>
    </div>
    <div
      v-show="$props.node.hasChildren"
      role="group"
      :aria-hidden="!$props.node.expanded"
      class="va-tree-node-children"
      :class="expandedClassComputed"
    >
      <va-tree-node
        v-for="childNode in $props.node.children"
        :key="childNode[$props.node.nodeKey]"
        :node="childNode"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotScope">
          <slot :name="name" v-bind="slotScope" />
        </template>
      </va-tree-node>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue'

import { VaIcon } from '../../../va-icon'
import { VaCheckbox } from '../../../va-checkbox'
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
      labelKey,
      iconColor,
      treeItems,
      selectable,
      toggleNode,
      colorComputed,
      toggleCheckbox,
    } = inject<TreeViewProvide>(TreeViewKey, {
      iconColor: computed(() => 'var(--va-white)'),
      colorComputed: computed(() => 'primary'),
      treeItems: computed({
        get: () => nodes,
        set: (value: TreeNode[]) => {
          nodes = value
        },
      }),
      labelKey: '',
      nodeKey: '',
      selectable: false,
      toggleNode: (node: TreeNode) => node,
      toggleCheckbox: (node: TreeNode, isSelected: boolean) => ({ node, isSelected }),
    })

    const labelComputed = computed(() => props.node[labelKey] || '')
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
    const tabIndexComputed = computed(() => props.node.disabled ? -1 : 0)

    const handleToggleNode = (event: Event, node: TreeNode) => {
      if (node.expanded) {
        (event.target as HTMLElement)?.blur()
      } else {
        toggleNode(node)
      }
    }

    return {
      nodeKey,
      iconColor,
      treeItems,
      selectable,

      toggleNode,
      toggleCheckbox,
      handleToggleNode,

      labelComputed,
      colorComputed,
      hasIconComputed,
      tabIndexComputed,
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

.va-tree-node {
  &-root {
    display: flex;
    padding: var(--va-tree-node-padding);
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

    &:hover::before {
      opacity: var(--va-tree-node-interactive-bg-opacity);
    }
  }

  &:focus > .va-tree-node-root {
    @include focus-outline;

    &::before {
      opacity: var(--va-tree-node-interactive-bg-opacity);
    }
  }

  &-content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;

    &__item {
      flex: var(--va-tree-node-content-item-flex);
      min-width: var(--va-tree-node-indent);

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
    background: var(--va-tree-node-children-background);
    padding-left: var(--va-tree-node-indent);
    width: 100%;

    &--expanded {
      display: block;
    }
  }

  &__checkbox {
    --va-checkbox-input-padding: 0;
  }
}
</style>
