<template>
  <div
    class="va-tree-node"
    :class="treeNodeClassComputed"
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
      <div class="va-tree-node-content" :class="indentClassComputed">
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
              :model-value="$props.node.checked"
              :color="colorComputed"
              indeterminate
              @update:model-value="(v) => toggleCheckbox($props.node, v)"
              class="va-tree-node__checkbox"
            />
          </slot>
        </div>
        <div v-if="iconComputed" class="va-tree-node-content__item">
          <slot name="icon" v-bind="$props.node">
            <va-icon :name="iconComputed" size="small" />
          </slot>
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
        :key="getTrackBy(childNode)"
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
import { defineComponent, computed, PropType } from 'vue'

import { useBem, useStrictInject } from '../../../../composables'

import { VaIcon, VaCheckbox } from '../../../'
import { TreeViewKey, TreeNode } from '../../types'

const INJECTION_ERROR_MESSAGE = 'The VaTreeNode component should be used in the context of VaTreeView component'

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

  setup: (props) => {
    const {
      iconBy,
      selectable,
      colorComputed,
      getText,
      getTrackBy,
      toggleNode,
      getNodeProperty,
      toggleCheckbox,
    } = useStrictInject(TreeViewKey, INJECTION_ERROR_MESSAGE)

    const labelComputed = computed(() => getText(props.node) || '')
    const isExpandedComputed = computed(() => !!props.node.expanded)
    const iconComputed = computed(() => getNodeProperty(props.node, iconBy))

    const treeNodeClassComputed = useBem('va-tree-node', () => ({
      disabled: !!props.node.disabled,
    }))

    const expandedClassComputed = useBem('va-tree-node-children', () => ({
      expanded: isExpandedComputed.value,
    }))

    const indentClassComputed = useBem('va-tree-node-content', () => ({
      indent: props.node.hasChildren === false,
    }))

    const tabIndexComputed = computed(() => props.node.disabled ? -1 : 0)

    const handleToggleNode = (event: Event, node: TreeNode) => {
      if (node.expanded) {
        (event.target as HTMLElement)?.blur()
      } else {
        toggleNode(node)
      }
    }

    return {
      selectable,

      getText,
      getTrackBy,
      toggleNode,
      handleToggleNode,
      toggleCheckbox,

      iconComputed,
      labelComputed,
      colorComputed,
      tabIndexComputed,
      indentClassComputed,
      isExpandedComputed,
      expandedClassComputed,
      treeNodeClassComputed,
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

    &-content {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 100%;

      &__item {
        flex: var(--va-tree-node-content-item-flex);
        min-width: var(--va-tree-node-indent);
        line-height: 1;

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

    &--disabled {
      @include va-disabled;

      .va-tree-node-content__item--leaf {
        cursor: pointer;
        pointer-events: all;
      }
    }

    &:focus > .va-tree-node-root {
      @include focus-outline;

      &::before {
        opacity: var(--va-tree-node-interactive-bg-opacity);
      }
    }
  }
</style>
