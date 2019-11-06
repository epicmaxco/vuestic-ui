<template>
  <div
    class="va-test"
    :style="{color}"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
import {
  ContextPluginMixin,
  getContextPropValue,
} from './context-provide/ContextPlugin'

export default {
  name: 'VaTest',
  mixins: [ContextPluginMixin],
  props: {
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', '')
      },
    },
    label: {
      type: String,
      default () {
        return getContextPropValue(this, 'label', '')
      },
    },
  },
}
</script>

<style lang="scss">
.va-test {
}
</style>
