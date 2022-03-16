<template>
  <div class="va-tree-category">
    <div
      class="va-tree-category__header"
      @click="toggle"
    >
      <div class="va-tree-category__header-switcher">
        <square-with-icon
          :icon="isOpenCached ? 'remove' : 'add'"
          :color="treeRoot.color || colorComputed"
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
import { defineComponent, provide, inject, ref, watch, nextTick, PropType, ComponentPublicInstance } from 'vue'
import { useColor } from '../../../composables/useColor'

// Components
import SquareWithIcon from '../SquareWithIcon/SquareWithIcon.vue'
import VaIcon from '../../va-icon/VaIcon.vue'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'

const VaTreeCategory = defineComponent({
  name: 'VaTreeCategory',
  components: {
    SquareWithIcon,
    VaIcon,
  },
  props: {
    label: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    icon: {
      type: String as PropType<string>,
      default: '',
    },
    color: {
      type: String as PropType<string>,
      default: 'primary',
    },
  },
  setup: (props) => {
    const nodes: any = ref<(typeof VaTreeCategory | typeof VaTreeNode)[]>([])
    const isOpenCached = ref<boolean | undefined>(false)

    const onChildMounted = (node: typeof VaTreeCategory | typeof VaTreeNode) => {
      nodes.value.push(node)
    }

    const onChildUnmounted = (removableNode: typeof VaTreeCategory | typeof VaTreeNode) => {
      nodes.value = nodes.value.filter((node: typeof VaTreeCategory | typeof VaTreeNode) => node !== removableNode)
    }

    const treeCategory: any = {
      onChildMounted,
      onChildUnmounted,
    }

    provide('treeCategory', treeCategory)
    provide('VaTreeCategory', VaTreeCategory)

    const treeRoot = inject('treeRoot', {
      onChildMounted: (value: any) => undefined,
      onChildUnmounted: (value: any) => undefined,
    })

    return {
      treeCategory,
      treeRoot,
      nodes,
      isOpenCached,
      ...useColor(props),
    }
  },
  methods: {
    collapse () {
      this.isOpenCached = false

      nextTick(() => {
        this.nodes.forEach((child: ComponentPublicInstance) => {
          if (child.$options.name === 'va-tree-category') {
            (child as ComponentPublicInstance<typeof VaTreeCategory>).collapse()
          }
        })
      })
    },

    expand () {
      this.isOpenCached = true

      nextTick(() => {
        this.nodes.forEach((child: typeof VaTreeCategory | typeof VaTreeNode) => {
          if (child instanceof VaTreeCategory) {
            child.expand()
          }
        })
      })
    },

    toggle (e: MouseEvent) {
      if (!(e.target as HTMLElement).classList.contains('va-checkbox__input')) {
        this.isOpenCached = !this.isOpenCached
      }
    },
  },

  created () {
    watch(
      () => this.$props.isOpen,
      (isOpen) => {
        this.isOpenCached = isOpen
      },
      { immediate: true })
  },

  mounted () {
    if (this.treeRoot) {
      this.treeRoot.onChildMounted(this)
    }
  },

  beforeUnmount () {
    if (this.treeRoot) {
      this.treeRoot.onChildUnmounted(this)
    }
  },
})

export default VaTreeCategory
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
