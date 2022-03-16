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
import { defineComponent, inject, PropType } from 'vue'
import { useColor } from '../../../composables/useColor'

// Components
import VaIcon from '../../va-icon'

export default defineComponent({
  name: 'VaTreeNode',
  components: { VaIcon },
  props: {
    highlighted: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    icon: {
      type: String as PropType<string>,
      default: '',
    },
    iconRight: {
      type: String as PropType<string>,
      default: '',
    },
    color: {
      type: String as PropType<string>,
      default: 'primary',
    },
  },
  setup (props) {
    const { theme } = useColor(props)
    const treeCategory = inject('treeCategory', {
      onChildMounted: (value: any) => undefined,
      onChildUnmounted: (value: any) => undefined,
    })

    return {
      treeCategory,
      theme,
    }
  },

  mounted () {
    if (this.treeCategory) {
      this.treeCategory.onChildMounted(this)
    }
  },

  beforeUnmount () {
    if (this.treeCategory) {
      this.treeCategory.onChildUnmounted(this)
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
