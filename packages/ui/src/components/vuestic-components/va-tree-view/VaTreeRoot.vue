<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { reactive } from 'vue'
import { Options, mixins } from 'vue-class-component'

@Options({
  name: 'VaTreeRoot',
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const parent = this
    return {
      va: reactive({
        color: parent.color,
      }),
    }
  },
})
export default class VaTreeRoot extends mixins(ColorThemeMixin) {
  collapse () {
    this.$nextTick(() => {
      this.$children.forEach(child => {
        if (child.$options.name === 'va-tree-category') {
          child.collapse()
        }
      })
    })
  }

  expand () {
    this.$nextTick(() => {
      this.$children.forEach(child => {
        if (child.$options.name === 'va-tree-category') {
          child.expand()
        }
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
