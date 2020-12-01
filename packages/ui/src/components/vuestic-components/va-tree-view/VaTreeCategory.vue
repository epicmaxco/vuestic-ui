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
        v-if="icon"
      >
        <va-icon
          :name="icon"
          :color="$themes['info']"
        />
      </div>
      <div class="va-tree-category__header-label">
        {{ label }}
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
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import SquareWithIcon from './SquareWithIcon/SquareWithIcon.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { Options, mixins } from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
import type { ComponentPublicInstance } from '@vue/runtime-core'
import { reactive } from 'vue'

@Options({
  name: 'VaTreeCategory',
  components: { VaIcon, SquareWithIcon },
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return {
      treeCategory: reactive({
        onChildMounted: (child: any) => this.onChildMounted(child),
      }),
    }
  },
})
export default class VaTreeCategory extends mixins(ColorThemeMixin) {
  isOpenCached = false
  nodes: any[] = []
  @Prop({ default: '', type: [String, Number] }) label!: string | number
  @Prop(Boolean) isOpen!: boolean
  @Prop({ default: '', type: String }) icon!: string

  @Inject({
    default: () => ({
      onChildMounted: () => undefined,
    }),
  }) readonly treeRoot!: any

  @Watch('isisOpen', { immediate: true })
  handler (isOpen: boolean) {
    this.isOpenCached = isOpen
  }

  collapse () {
    this.isOpenCached = false
    this.$nextTick(() => {
      this.nodes.forEach((child: ComponentPublicInstance) => {
        if (child.$options.name === 'va-tree-category') {
          (child as VaTreeCategory).collapse()
        }
      })
    })
  }

  expand () {
    this.isOpenCached = true
    this.$nextTick(() => {
      this.nodes.forEach((child: ComponentPublicInstance) => {
        if (child.$options.name === 'va-tree-category') {
          (child as VaTreeCategory).expand()
        }
      })
    })
  }

  toggle (e: MouseEvent) {
    if (!(e.target as HTMLElement).classList.contains('va-checkbox__input')) {
      this.isOpenCached = !this.isOpenCached
    }
  }

  onChildMounted (node: any) {
    this.nodes.push(node)
  }

  mounted () {
    if (this.treeRoot) {
      this.treeRoot.onChildMounted(this)
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

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
