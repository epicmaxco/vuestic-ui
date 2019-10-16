<template>
  <div class="va-test" :style="computedStyles">
    <slot>Test</slot>
  </div>
</template>

<script>
import { ContextProvideMixin } from '../../../services/ContextProvidePlugin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-test',
  mixins: [ContextProvideMixin, ColorThemeMixin],

  props: {
    color: {
      type: String,
      default () {
        console.log('default', this._$contextPluginColor)
        return this._$contextPluginColor
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
