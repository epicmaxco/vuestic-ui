<template>
  <div class="va-test" :style="computedStyles">
    <slot>Test</slot>
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../services/ColorThemePlugin'

export default {
  name: 'va-test',
  mixins: [ColorThemeMixin],

  props: {
    color: {
      type: String,
      default () {
        return this.$vaContextPlugin.getComponentContextProps(this.$options.name, 'color')
      },
    },
  },
  computed: {
    computedStyles () {
      return {
        color: this.colorComputed,
      }
    },
  },
}
</script>

<style lang="scss">
.va-test {
}

</style>
