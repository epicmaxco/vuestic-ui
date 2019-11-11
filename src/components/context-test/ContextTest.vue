<template>
  <div
    class="va-test"
    :style="{ color: c_color }"
  >
    <slot>{{ c_label }}</slot>
  </div>
</template>

<script>
import { getContextablePropMixinFactory } from './context-provide/ContextPlugin'

const contextConfigMixin = getContextablePropMixinFactory({
  color: { type: String, default: '' },
  label: { type: String, default: '' },
})

export default {
  name: 'VaTest',
  mixins: [contextConfigMixin],
}
</script>

<style lang="scss">
.va-test {
}
</style>
