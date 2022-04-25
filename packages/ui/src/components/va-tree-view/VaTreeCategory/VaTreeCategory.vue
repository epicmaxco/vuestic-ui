<template>
  <div class="va-tree-category">
    <div
      class="va-tree-category__header"
      @click="toggle"
    >
      <div class="va-tree-category__header-switcher">
        <square-with-icon
          :icon="isOpenCached ? 'remove' : 'add'"
          :color="treeView.color || colorComputed"
        />
      </div>
      <div
        class="va-tree-category__header-checkbox"
        v-if="$slots.checkbox"
      >
        <slot name="checkbox" />
      </div>
      <div
        class="va-tree-category__header-icon"
        v-if="$props.icon"
      >
        <va-icon
          :name="$props.icon"
          :color="theme.getColor('info')"
        />
      </div>
      <div class="va-tree-category__header-label">
        {{ $props.label }}
      </div>
    </div>

    <div
      class="va-tree-category__list-container"
      v-if="isOpenCached"
    >
      <div class="va-tree-category__list-internal-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  Ref,
  watch,
} from 'vue'
import SquareWithIcon from '../SquareWithIcon/SquareWithIcon.vue'
import VaIcon from '../../va-icon/VaIcon.vue'
import { useColor } from '../../../composables/useColor'
import { TreeCategory, TreeNodeCommon, TreeCategoryKey, TreeNodeComponent, TreeViewKey } from '../types'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'

export default defineComponent({
  name: 'VaTreeCategory',
  components: {
    SquareWithIcon,
    VaIcon,
  },
  props: {
    label: {
      type: [String, Number],
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  setup: (props) => {
    const nodes: Ref<TreeNodeComponent[]> = ref([])
    const isOpenCached = ref<boolean | undefined>(false)

    const onChildMounted = (node: TreeNodeComponent) => {
      nodes.value.push(node)
    }

    const onChildUnmounted = (removableNode: TreeNodeComponent) => {
      nodes.value = nodes.value.filter((node: TreeNodeComponent) => node !== removableNode)
    }

    const treeView: TreeNodeCommon<TreeCategory | typeof VaTreeNode> = inject(TreeViewKey, {
      onChildMounted: (value: TreeCategory | typeof VaTreeNode) => undefined,
      onChildUnmounted: (value: TreeCategory | typeof VaTreeNode) => undefined,
    })

    const collapse = () => {
      isOpenCached.value = false

      nextTick(() => {
        nodes.value.forEach((child: ComponentPublicInstance) => {
          if (child.$options.name === 'va-tree-category') {
            (child as ComponentPublicInstance<TreeCategory>).collapse()
          }
        })
      })
    }

    const expand = () => {
      isOpenCached.value = true

      nextTick(() => {
        nodes.value.forEach((child: TreeNodeComponent) => {
          child.expand?.()
        })
      })
    }

    const toggle = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).classList.contains('va-checkbox__input')) {
        isOpenCached.value = !isOpenCached.value
      }
    }

    watch(
      () => props.isOpen,
      (isOpen) => {
        isOpenCached.value = isOpen
      },
      { immediate: true })

    const treeCategory: TreeCategory = {
      treeView,
      nodes: nodes.value,
      isOpenCached: isOpenCached.value,
      onChildMounted,
      onChildUnmounted,
      collapse,
      expand,
      toggle,
    }

    provide(TreeCategoryKey, treeCategory)
    onMounted(() => treeView?.onChildMounted(treeCategory))
    onBeforeUnmount(() => treeView?.onChildUnmounted(treeCategory))

    return {
      treeCategory,
      treeView,
      nodes,
      isOpenCached,
      collapse,
      expand,
      toggle,
      ...useColor(props),
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
@import 'variables';

.va-tree-category {
  font-family: var(--va-font-family);

  &__header {
    cursor: var(--va-tree-category-header-cursor);
    display: var(--va-tree-category-header-display);
    align-items: var(--va-tree-category-header-align-items);
  }

  &__header-switcher {
    margin-right: 0.5rem;
  }

  &__header-checkbox {
    margin-right: var(--va-tree-category-header-checkbox-margin-right);
    height: var(--va-tree-category-header-checkbox-height);
    width: var(--va-tree-category-header-checkbox-width);
    display: var(--va-tree-category-header-checkbox-display);
    align-items: var(--va-tree-category-header-checkbox-align-items);
    justify-content: var(--va-tree-category-header-checkbox-justify-content);

    .va-checkbox__square {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 1.5rem;
    }
  }

  &__header-icon {
    color: var(--va-tree-category-header-icon-color);
    margin-right: var(--va-tree-category-header-icon-margin-right);
    font-size: var(--va-tree-category-header-icon-font-size);
    line-height: var(--va-tree-category-header-icon-line-height);
  }

  &__header-label {
    word-wrap: var(--va-tree-category-header-label-word-wrap);
    overflow: var(--va-tree-category-header-label-overflow);
    line-height: var(--va-tree-category-header-label-line-height);
  }

  &__list-container {
    margin-top: var(--va-tree-category-list-container-margin-top);
    padding-left: var(--va-tree-category-list-container-padding-left);
  }

  &__list-internal-container {
    background-image: linear-gradient(#adb3b9 33%, rgba(255, 255, 255, 0) 0%);
    background-position: left;
    background-size: 1px 3px;
    background-repeat: repeat-y;
    padding-left: 1.1875rem;
  }

  & + .va-tree-category,
  .va-tree-node + .va-tree-node,
  .va-tree-category + .va-tree-node,
  .va-tree-node + .va-tree-category {
    margin-top: 0.75rem;
  }
}
</style>
