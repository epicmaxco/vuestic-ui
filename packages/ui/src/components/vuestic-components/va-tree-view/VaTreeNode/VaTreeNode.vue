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
import { inject } from 'vue'
import { mixins, Options, prop, setup, Vue } from 'vue-class-component'

import ColorMixin from '../../../../services/color-config/ColorMixin'
import VaIcon from '../../va-icon'

class TreeNodeProps {
  highlighted = prop<boolean>(Boolean)
  icon = prop<string>({ type: String, default: '' })
  iconRight = prop<string>({ type: String, default: '' })
  color = prop<string>({ type: String, default: 'primary' })
}

const TreeNodePropsMixin = Vue.with(TreeNodeProps)

@Options({
  name: 'VaTreeNode',
  components: { VaIcon },
})
export default class VaTreeNode extends mixins(
  ColorMixin,
  TreeNodePropsMixin,
) {
  setupContext = setup(() => {
    const treeCategory = inject('treeCategory', {
      onChildMounted: (value: any) => undefined,
      onChildUnmounted: (value: any) => undefined,
    })

    return {
      treeCategory,
    }
  })

  mounted () {
    if (this.setupContext.treeCategory) {
      this.setupContext.treeCategory.onChildMounted(this)
    }
  }

  beforeUnmount () {
    if (this.setupContext.treeCategory) {
      this.setupContext.treeCategory.onChildUnmounted(this)
    }
  }
}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";
@import 'variables.scss';

.va-tree-node {
  display: var(--va-tree-node-display);
  align-items: var(--va-tree-node-align-items);

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
  }

  &--highlighted #{&}__label {
    background-color: var(--va-tree-node-label-highlighted-bg);
  }
}
</style>
