<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { reactive } from 'vue'
import { Options, mixins } from 'vue-class-component'
import type { ComponentPublicInstance } from '@vue/runtime-core'
import VaTreeCategory from './VaTreeCategory.vue'

@Options({
  name: 'VaTreeRoot',
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return {
      treeRoot: reactive({
        color: this.color,
        onChildMounted: (child: any) => this.onChildMounted(child),
      }),
    }
  },
})
export default class VaTreeRoot extends mixins(ColorThemeMixin) {
  categories: any = []

  collapse () {
    this.$nextTick(() => {
      this.categories.forEach((child: ComponentPublicInstance) => {
        if ((child as VaTreeCategory).$options.name === 'VaTreeCategory') {
          (child as VaTreeCategory).collapse()
        }
      })
    })
  }

  expand () {
    this.$nextTick(() => {
      this.categories.forEach((child: ComponentPublicInstance) => {
        if ((child as VaTreeCategory).$options.name === 'VaTreeCategory') {
          (child as VaTreeCategory).expand()
        }
      })
    })
  }

  onChildMounted (category: any) {
    this.categories.push(category)
  }
}
</script>

<style lang="scss">
.va-tree-root {
  padding: 0.3125rem;
}
</style>
