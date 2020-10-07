<template>
  <div class="va-expand-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

const ExpandGroupPropsMixin = makeContextablePropsMixin({
  value: { type: Array, default: () => [] },
  multiply: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

@Component({
  name: 'VaExpandGroup',
})
export default class VaExpandGroup extends Mixins(
  StatefulMixin,
  ExpandGroupPropsMixin,
) {
  @Provide() accordion = {
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
  }

  onChildChange (child: any, state: any) {
    const emitValue: any = []
    this.$children.forEach(expand => {
      if (expand === child) {
        emitValue.push((expand as any).childValue)
        return
      }
      if (!this.c_multiply) {
        (expand as any).childValue = false
      }
      emitValue.push((expand as any).childValue)
    })
    this.valueComputed = emitValue
  }

  mounted () {
    this.$children.forEach((expand, index) => {
      (expand as any).childValue = this.valueComputed[index]
    })
  }

  updated () {
    this.$children.forEach((expand, index) => {
      (expand as any).childValue = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
