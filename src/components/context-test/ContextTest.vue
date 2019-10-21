<template>
  <div class="va-test" :style="computedStyles">
    <slot>Test</slot>
  </div>
</template>

<script>
import { ContextProvideMixin } from './context-provide/ContextProvidePlugin'

export default {
  name: 'va-test',
  mixins: [ContextProvideMixin],
  props: {
    color: {
      type: String,
    },
  },
  computed: {
    computedStyles () {
      return {
        color: this.$themes[this.getProviderConfig('color')],
      }
    },
  },
}
</script>

<style lang="scss">
.va-test {
}

</style>
