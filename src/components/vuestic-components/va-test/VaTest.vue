<template>
  <div class="va-test" :style="computedStyles">
    <Slot>
      Test
    </Slot>
  </div>
</template>

<script>
import { ContextProvideMixin } from '../../../services/ContextProvidePlugin'

export default {
  name: 'va-test',
  mixins: [ContextProvideMixin],
  props: {
    color: {
      type: String,
      default: 'green',
    },
  },
  created () {
    this._$contextPluginUpdateProps()
  },
  computed: {
    computedStyles () {
      return {
        color: this.color,
      }
    },
  },
  methods: {
  },
}
</script>

<style lang="scss">
.va-test {
}

</style>
