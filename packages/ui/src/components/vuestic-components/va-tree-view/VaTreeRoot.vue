<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { reactive } from 'vue'
import { Options, mixins } from 'vue-class-component'
import VaTreeCategory from './VaTreeCategory.vue'

@Options({
  name: 'VaTreeRoot',
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return {
      treeRoot: reactive({
        color: this.color,
        onChildMounted: (child: VaTreeCategory) => this.onChildMounted(child),
        onChildUnmounted: (child: VaTreeCategory) => this.onChildUnmounted(child),
      }),
    }
  },
})

export default class VaTreeRoot extends mixins(ColorThemeMixin) {
  categories: any = []

  collapse () {
    this.$nextTick(() => {
      this.categories.forEach((child: VaTreeCategory) => {
        child.collapse()
      })
    })
  }

  expand () {
    this.$nextTick(() => {
      this.categories.forEach((child: VaTreeCategory) => {
        child.expand()
      })
    })
  }

  onChildMounted (category: VaTreeCategory) {
    this.categories.push(category)
  }

  onChildUnmounted (removableCategory: VaTreeCategory) {
    this.categories = this.categories.filter((category: VaTreeCategory) => category !== removableCategory)
  }
}
</script>

<style lang="scss">
.va-tree-root {
  padding: 0.3125rem;
}
</style>
