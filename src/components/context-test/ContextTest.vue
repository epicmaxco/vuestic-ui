<template>
  <div class="va-test" :style="computedStyles">
    <slot>Test</slot>
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../services/ColorThemePlugin'
import { ContextProviderPluginKey } from '../../services/context-provide/ContextProvidePlugin'

export default {
  name: 'va-test',
  mixins: [ColorThemeMixin],
  inject: { _$context: [ContextProviderPluginKey] },
  props: {
    color: {
      type: String,
      default () {
        return this._$context.getComponentConfig(this.$options.name, 'color')
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
