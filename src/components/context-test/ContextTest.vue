<template>
  <div
    class="va-test"
    :style="{ color: c_color }"
  >
    <slot>{{ c_label }}</slot>
  </div>
</template>

<script>
import { getContextablePropMixin } from './context-provide/ContextPlugin'

export default {
  name: 'VaTest',
  mixins: [
    getContextablePropMixin('color', { type: String, default: '' }),
    getContextablePropMixin('label', { type: String, default: '' }),
  ],
}
</script>

<style lang="scss">
.va-test {
}
</style>
