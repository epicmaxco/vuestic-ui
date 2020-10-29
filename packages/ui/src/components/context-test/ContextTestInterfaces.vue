<template>
  <div class="context-test-interfaces">
    {{ c_value }}
  </div>
</template>

<script>
import { makeContextablePropsMixin } from './context-provide/ContextPlugin'

const contextConfigMixin = makeContextablePropsMixin({
  modelValue: { default: 'default' },
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
