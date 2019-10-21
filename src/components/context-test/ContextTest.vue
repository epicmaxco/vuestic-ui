<template>
  <div class="va-test" :style="{color}">
    <slot>Test</slot>
  </div>
</template>

<script>
import {
  ContextProvideMixin,
  getProviderConfig,
} from './context-provide/ContextProvidePlugin'

export default {
  name: 'va-test',
  mixins: [ContextProvideMixin],
  props: {
    color: {
      type: String,
      default () {
        return getProviderConfig(this, 'color', '')
      },
    },
  },
}
</script>

<style lang="scss">
.va-test {

}
</style>
