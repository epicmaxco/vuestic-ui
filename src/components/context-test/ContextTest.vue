<template>
  <div class="va-test" :style="{color}">
    <slot>Test</slot>
  </div>
</template>

<script>
import {
  ContextPluginMixin,
  getProviderConfig,
} from './context-provide/ContextPlugin'

export default {
  name: 'va-test',
  mixins: [ContextPluginMixin],
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
