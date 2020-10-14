<template>
  <div
    class="va-test"
    :style="{ color: c_color }"
  >
    <slot>{{ c_label }}</slot>
  </div>
</template>

<script>
import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'

const contextConfigMixin = makeConfigTransportMixin({
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
