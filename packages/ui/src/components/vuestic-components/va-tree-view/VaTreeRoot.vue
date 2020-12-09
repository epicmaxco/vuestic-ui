<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

@Component({
  name: 'VaTreeRoot',
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const parent = this
    return {
      va: new Vue({
        computed: {
          color () {
            return parent.color
          },
        },
      }),
    }
  },
})
export default class VaTreeRoot extends Mixins(
  ColorThemeMixin,
) {
  public collapse () {
    this.$nextTick(() => {
      this.$children.forEach(child => {
        if (child.$options.name === 'VaTreeCategory') {
          child.collapse()
        }
      })
    })
  }

  public expand () {
    this.$nextTick(() => {
      this.$children.forEach(child => {
        if (child.$options.name === 'VaTreeCategory') {
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
