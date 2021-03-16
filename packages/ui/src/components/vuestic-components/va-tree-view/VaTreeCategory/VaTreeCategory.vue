<template>
  <div class="va-tree-category">
    <div
      class="va-tree-category__header"
      @click="toggle"
    >
      <div class="va-tree-category__header-switcher">
        <square-with-icon
          :icon="isOpenCached ? 'remove' : 'add'"
          :color="setupContext.treeRoot.color || colorComputed"
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
import { provide, inject, watch, ComponentPublicInstance, ref } from 'vue'
import { Options, Vue, mixins, prop, setup } from 'vue-class-component'

import ColorMixin from '../../../../services/color-config/ColorMixin'
import SquareWithIcon from '../SquareWithIcon'
import VaIcon from '../../va-icon'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'

class TreeCategoryProps {
  label = prop<string | number>({ default: '', type: [String, Number] })
  isOpen = prop<boolean>(Boolean)
  icon = prop<string>({ default: '', type: String })
}

const TreeCategoryPropsMixin = Vue.with(TreeCategoryProps)

@Options({
  name: 'VaTreeCategory',
  components: { VaIcon, SquareWithIcon },
})
export default class VaTreeCategory extends mixins(
  ColorMixin,
  TreeCategoryPropsMixin,
) {
  isOpenCached: boolean | undefined = false

  setupContext = setup(() => {
    const nodes = ref<(VaTreeCategory | VaTreeNode)[]>([])

    const onChildMounted = (node: VaTreeCategory | VaTreeNode) => {
      nodes.value.push(node)
    }

    const onChildUnmounted = (removableNode: VaTreeCategory | VaTreeNode) => {
      nodes.value = nodes.value.filter((node: VaTreeCategory | VaTreeNode) => node !== removableNode)
    }

    const treeCategory = {
      onChildMounted,
      onChildUnmounted,
    }

    provide('treeCategory', treeCategory)

    const treeRoot = inject('treeRoot', {
      onChildMounted: (value: any) => undefined,
      onChildUnmounted: (value: any) => undefined,
    })

    return {
      treeCategory,
      treeRoot,
      nodes,
    }
  })

  created () {
    watch(
      () => this.$props.isOpen,
      (isOpen) => {
        this.isOpenCached = isOpen
      },
      { immediate: true })
  }

  collapse () {
    this.isOpenCached = false
    this.$nextTick(() => {
      this.setupContext.nodes.forEach((child: ComponentPublicInstance) => {
        if (child.$options.name === 'va-tree-category') {
          (child as VaTreeCategory).collapse()
        }
      })
    })
  }

  expand () {
    this.isOpenCached = true
    this.$nextTick(() => {
      this.setupContext.nodes.forEach((child: VaTreeCategory | VaTreeNode) => {
        if (child instanceof VaTreeCategory) {
          child.expand()
        }
      })
    })
  }

  toggle (e: MouseEvent) {
    if (!(e.target as HTMLElement).classList.contains('va-checkbox__input')) {
      this.isOpenCached = !this.isOpenCached
    }
  }

  mounted () {
    if (this.setupContext.treeRoot) {
      this.setupContext.treeRoot.onChildMounted(this)
    }
  }

  beforeUnmount () {
    if (this.setupContext.treeRoot) {
      this.setupContext.treeRoot.onChildUnmounted(this)
    }
  }
}
</script>

<style lang="scss">
@import "src/components/vuestic-sass/resources/resources";

.va-tree-category {
  &__header {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &__header-switcher {
    margin-right: 0.5rem;
  }

  &__header-checkbox {
    margin-right: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .va-checkbox__square {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 1.5rem;
    }
  }

  &__header-icon {
    color: $theme-blue-dark;
    margin-right: 0.5rem;
    font-size: 24px;
    line-height: 24px;
  }

  &__header-label {
    word-wrap: break-word;
    overflow: hidden;
  }

  &__list-container {
    margin-top: 0.625rem;
    padding-left: 0.6875rem;
  }

  &__list-internal-container {
    background-image: linear-gradient($gray 33%, rgba(255, 255, 255, 0) 0%);
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
