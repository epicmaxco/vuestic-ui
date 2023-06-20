<template>
  <div
    class="va-tree-node"
    :class="treeNodeClassComputed"
    :role="roleComputed"
    :aria-expanded="isExpandedComputed"
    :aria-disabled="$props.node.disabled"
    :aria-checked="!!$props.node.checked"
    :tabindex="tabIndexComputed"
    @keydown.up.stop.prevent="handleKeyboardNavigation($event, $props.node)"
    @keydown.right.stop.prevent="handleKeyboardNavigation($event, $props.node)"
    @keydown.down.stop.prevent="handleKeyboardNavigation($event, $props.node)"
    @keydown.left.stop.prevent="handleKeyboardNavigation($event, $props.node)"
    @keydown.space.stop.prevent="handleKeyboardNavigation($event, $props.node)"
    @keydown.esc.stop.prevent="handleKeyboardNavigation($event, $props.node)"
  >
    <div class="va-tree-node-root">
      <div class="va-tree-node-content" :class="indentClassComputed" @click="onNodeClick('node')">
        <div
          v-if="$props.node.hasChildren"
          class="va-tree-node-content__item va-tree-node-content__item--leaf"
          @click.stop="onNodeClick('leaf')"
        >
          <slot name="icon-toggle" v-bind="$props.node">
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
          <slot name="checkbox" v-bind="$props.node">
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
        <div class="va-tree-node-content__body" :class="cursorClassComputed">
          <slot name="content" v-bind="$props.node">{{ labelComputed }}</slot>
        </div>
      </div>
    </div>
    <div
      v-show="$props.node.hasChildren"
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
    },
  },

  components: { VaCheckbox, VaIcon },

  setup: (props) => {
    const {
      iconBy,
      selectable,
      expandNodeBy,
      colorComputed,
      selectedNodeComputed,
      getText,
      getTrackBy,
      toggleNode,
      toggleCheckbox,
      getNodeProperty,
      handleKeyboardNavigation,
    } = useStrictInject(TreeViewKey, INJECTION_ERROR_MESSAGE)

    const labelComputed = computed(() => getText(props.node) || '')
    const isExpandedComputed = computed(() => props.node.hasChildren ? !!props.node.expanded : undefined)
    const iconComputed = computed(() => getNodeProperty(props.node, iconBy))
    const roleComputed = computed(() => props.node.hasChildren ? 'group' : 'treeitem')

    const treeNodeClassComputed = useBem('va-tree-node', () => ({
      disabled: Boolean(props.node.disabled),
      checked: Boolean(props.node.checked),
      hasChildren: Boolean(props.node.hasChildren),
      [`level-${props.node.level}`]: true,
    }))

    const expandedClassComputed = useBem('va-tree-node-children', () => ({
      expanded: !!isExpandedComputed.value,
    }))

    const indentClassComputed = useBem('va-tree-node-content', () => ({
      indent: props.node.hasChildren === false,
    }))

    const cursorClassComputed = useBem('va-tree-node-content', () => ({
      clickable: (props.node.hasChildren === true && expandNodeBy === 'node'),
    }))

    const tabIndexComputed = computed(() => props.node.disabled ? -1 : 0)

    const onNodeClick = (type: typeof expandNodeBy) => {
      const nodeType = expandNodeBy === 'node' && type === 'leaf' ? 'node' : type

      if (expandNodeBy === nodeType) {
        toggleNode(props.node)
      }

      selectedNodeComputed.value = props.node
    }

    return {
      selectable,
      expandNodeBy,

      getText,
      getTrackBy,
      toggleNode,
      onNodeClick,
      handleKeyboardNavigation,
      toggleCheckbox,

      roleComputed,
      iconComputed,
      labelComputed,
      colorComputed,
      tabIndexComputed,
      indentClassComputed,
      isExpandedComputed,
      expandedClassComputed,
      treeNodeClassComputed,
      cursorClassComputed,
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

    &--clickable {
      cursor: pointer;
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

  &:focus-visible > .va-tree-node-root {
    @include focus-outline;

    &::before {
      opacity: var(--va-tree-node-interactive-bg-opacity);
    }
  }
}
</style>
