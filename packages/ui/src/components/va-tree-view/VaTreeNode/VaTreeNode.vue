<template>
  <div
    class="va-tree-node"
    :class="{ 'va-tree-node--highlighted': $props.highlighted }"
  >
    <div
      class="va-tree-node__checkbox"
      v-if="$slots.checkbox"
    >
      <slot name="checkbox" />
    </div>
    <div
      class="va-tree-node__icon"
      v-if="$props.icon"
    >
      <va-icon
        :name="$props.icon"
        :color="theme.getColor('info')"
        :size="24"
      />
    </div>
    <div class="va-tree-node__label">
      <slot />
    </div>
    <div
      class="va-tree-node__icon-right"
      v-if="$props.iconRight"
      :size="24"
    >
      <va-icon
        :name="$props.iconRight"
        :color="theme.getColor('info')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide } from 'vue'
import { useColor } from '../../../composables/useColor'
import VaIcon from '../../va-icon'
import { TreeNodeCommon, TreeCategoryKey, TreeNodeKey } from '../types'

export default defineComponent({
  name: 'VaTreeNode',
  components: { VaIcon },
  props: {
    highlighted: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  setup (props) {
    const { theme } = useColor(props)
    const treeCategory: TreeNodeCommon<typeof TreeNodeKey> = inject(TreeCategoryKey, {
      onChildMounted: (value: typeof TreeNodeKey) => undefined,
      onChildUnmounted: (value: typeof TreeNodeKey) => undefined,
    })

    provide(TreeNodeKey, {
      props: computed(() => props),
    })

    onMounted(() => treeCategory && treeCategory.onChildMounted(TreeNodeKey))
    onBeforeUnmount(() => treeCategory && treeCategory.onChildUnmounted(TreeNodeKey))

    return {
      treeCategory,
      theme,
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
@import 'variables.scss';

.va-tree-node {
  display: var(--va-tree-node-display);
  align-items: var(--va-tree-node-align-items);
  font-family: var(--va-font-family);

  .form-group {
    margin-bottom: 0;
  }

  &__icon {
    margin-right: var(--va-tree-node-icon-margin-right);
  }

  &__icon-right {
    margin-left: var(--va-tree-node-icon-margin-right);
  }

  &__label {
    flex-grow: var(--va-tree-node-label-flex-grow);
    word-wrap: var(--va-tree-node-label-word-wrap);
    overflow: var(--va-tree-node-label-overflow);
    line-height: var(--va-tree-node-label-line-height);
  }

  &--highlighted #{&}__label {
    background-color: var(--va-tree-node-label-highlighted-bg);
  }
}
</style>
