<template>
  <div class="context-test-interfaces">
    {{ c_value }}
  </div>
</template>

<script>
import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'

const contextConfigMixin = makeConfigTransportMixin({
  value: { default: 'default' },
})

export default {
  name: 'ContextTestInterfaces',
  mixins: [contextConfigMixin],
}
</script>

<style lang="scss">
.context-test-interfaces {

}
</style>
