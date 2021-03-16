<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, ref } from 'vue'
import { Options, setup, mixins } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import VaTreeCategory from './VaTreeCategory/VaTreeCategory.vue'

@Options({
  name: 'VaTreeRoot',
})

export default class VaTreeRoot extends mixins(ColorMixin) {
  setupContext = setup(() => {
    const categories = ref<VaTreeCategory[]>([])

    const onChildMounted = (category: VaTreeCategory) => {
      categories.value.push(category)
    }

    const onChildUnmounted = (removableCategory: VaTreeCategory) => {
      categories.value = categories.value.filter((category: VaTreeCategory) => category !== removableCategory)
    }

    const treeRoot = {
      color: this.$props.color,
      onChildMounted,
      onChildUnmounted,
    }

    provide('treeRoot', treeRoot)

    return {
      categories,
    }
  })

  collapse () {
    this.$nextTick(() => {
      this.setupContext.categories.forEach((child: VaTreeCategory) => {
        child.collapse()
      })
    })
  }

  expand () {
    this.$nextTick(() => {
      this.setupContext.categories.forEach((child: VaTreeCategory) => {
        child.expand()
      })
    })
  }
}
</script>

<style lang="scss">
.va-tree-root {
  padding: 0.3125rem;
}
</style>
